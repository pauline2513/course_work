import { HttpStatus, Injectable } from "@nestjs/common";
import { CountriesDatasourceService } from "src/datasource/countriesdatasource.service";
import { Country } from "./country.entity";
import { Tour } from "src/tours/tour.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreateCountryDto } from "./dto/CreateCountryDto";
import { IncompleteCountryDto } from "./dto/incomplete-country.dto";

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>, // "внедряем" репозиторий Author в сервис
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>, // "внедряем" репозиторий Affiliation в сервис
  ) {}

  async create(countryDto: CreateCountryDto): Promise<Country>
  {
      //получаем объект CreateAuthorDto
      const country = this.countryRepository.create(); //создаем объект Author из репозитория
      country.name = countryDto.name; //заполняем поля объекта Author
      country.information = countryDto.information;

      const tours = await this.tourRepository.findBy({
        //получаем массив Affiliation по id
        id: In(countryDto.tours),
      });
      country.tours = tours;
      await this.countryRepository.save(country); //сохраняем объект Author в БД
      return country; //возвращаем объект Author
  }

  findOne(id: number): Promise<Country> {
  // Promise<Author> - указывает, что функция возвращает объект Author в виде Promise (c асинхронного потока)
   return this.countryRepository.findOne({
     //получаем объект Author по id
     where: { id }, //указываем условие поиска по id
     relations: { tours: true}, //получаем связанные объекты
   });
 }

  async findAll(): Promise<Country[]> {
    const countries = await this.countryRepository.find({
      //получаем связанные объекты
      relations: {
        tours: true,
      },
    }); //получаем массив Author из БД
    return countries; //возвращаем массив Author
  }

  async update(id: number, updatedCountry: Country) {
    //получаем объект Author для обновления по id
    const country = await this.countryRepository.findOne({ where: { id } }); //получаем объект Author по id из БД
    country.name = updatedCountry.name; //обновляем поля объекта Author
    country.information = updatedCountry.information;
    country.tours = updatedCountry.tours
    await this.countryRepository.save(country); //сохраняем объект Author в БД
    return country; //возвращаем объект Author
  }
  remove(id: number) {
    this.countryRepository.delete({ id }); //удаляем объект Author из БД
    return HttpStatus.OK;
  }
  async findIncomplete(): Promise<IncompleteCountryDto[]> {
    const countries = await this.countryRepository.find(); //получаем массив Author из БД
    const incompleteCountries: IncompleteCountryDto[] = countries.map((country) => {
      //преобразуем массив Author в массив IncompleteAuthorDto
      const incompleteCountry = new IncompleteCountryDto();
      incompleteCountry.id = country.id;
      incompleteCountry.name = country.name;
      return incompleteCountry;
    });
    return incompleteCountries; //возвращаем массив IncompleteAuthorDto
  }




}