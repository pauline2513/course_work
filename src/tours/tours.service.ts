import { HttpStatus, Injectable } from "@nestjs/common";
import { ToursDatasourceService } from "src/datasource/toursdatasource.service";
import { Tour } from "./tour.entity";
import { Country } from "src/countries/country.entity";
import { Sale } from "src/sales/sale.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreateTourDto } from "./dto/CreateTourDto";
import { IncompleteTourDto } from "./dto/incomplete-tour.dto";


@Injectable()
export class ToursService {
    constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>, 
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>, 
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>, 
  ) {}

  async create(tourDto: CreateTourDto): Promise<Tour>
  {
      //получаем объект CreateAuthorDto
      const tour = this.tourRepository.create(); //создаем объект Author из репозитория
      tour.tour_name = tourDto.tour_name; //заполняем поля объекта Author
      tour.date_start = new Date(tourDto.date_start);
      tour.date_end = new Date(tourDto.date_end);
      tour.people_amount = tourDto.people_amount;
      
      const country = await this.countryRepository.findOne({
        //получаем массив Affiliation по id
        where: { id: tourDto.country },
      });
      tour.country = country;

      const sales = await this.saleRepository.findBy({
        //получаем массив Affiliation по id
        id: In(tourDto.sales),
      });

      await this.tourRepository.save(tour); //сохраняем объект Author в БД
      return tour; //возвращаем объект Author
  }

  findOne(id: number): Promise<Tour> {
  // Promise<Author> - указывает, что функция возвращает объект Author в виде Promise (c асинхронного потока)
   return this.tourRepository.findOne({
     //получаем объект Author по id
     where: { id }, //указываем условие поиска по id
     relations: { country: true, sales: true}, //получаем связанные объекты
   });
 }

  async findAll(): Promise<Tour[]> {
    const tours = await this.tourRepository.find({
      //получаем связанные объекты
      relations: {
        country: true,
        sales: true
      },
    }); //получаем массив Author из БД
    return tours; //возвращаем массив Author
  }

  async update(id: number, updatedTour: Tour) {
    //получаем объект Author для обновления по id
    const tour = await this.tourRepository.findOne({ where: { id } }); //получаем объект Author по id из БД
    tour.tour_name = updatedTour.tour_name; //обновляем поля объекта Author
    tour.date_start = updatedTour.date_start;
    tour.date_end = updatedTour.date_end;
    tour.people_amount = updatedTour.people_amount;
    tour.country = updatedTour.country;
    tour.sales = updatedTour.sales;
    await this.tourRepository.save(tour); //сохраняем объект Author в БД
    return tour; //возвращаем объект Author
  }
  remove(id: number) {
    this.tourRepository.delete({ id }); //удаляем объект Author из БД
    return HttpStatus.OK;
  }
  async findIncomplete(): Promise<IncompleteTourDto[]> {
    const tours = await this.tourRepository.find(); //получаем массив Author из БД
    const incompleteTours: IncompleteTourDto[] = tours.map((tour) => {
      //преобразуем массив Author в массив IncompleteAuthorDto
      const incompleteTour = new IncompleteTourDto();
      incompleteTour.id = tour.id;
      incompleteTour.tour_name = tour.tour_name;
      incompleteTour.date_start = tour.date_start;
      incompleteTour.date_end = tour.date_end;
      return incompleteTour;
    });
    return incompleteTours; //возвращаем массив IncompleteAuthorDto
  }
}
