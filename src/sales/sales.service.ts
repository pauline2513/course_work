import { HttpStatus, Injectable } from "@nestjs/common";
import { SalesDatasourceService } from "src/datasource/salesdatasource.service";
import { Sale } from "./sale.entity";
import { Client } from "src/clients/client.entity";
import { Tour } from "src/tours/tour.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSaleDto } from "./dto/CreateSaleDto";
import { IncompleteSaleDto } from "./dto/incomplete-sale.dto";

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>, // "внедряем" репозиторий Author в сервис
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>, // "внедряем" репозиторий Affiliation в сервис
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>, // "внедряем" репозиторий Affiliation в сервис
  ) {}

  async create(saleDto: CreateSaleDto): Promise<Sale>
  {
      //получаем объект CreateAuthorDto
      const sale = this.saleRepository.create(); //создаем объект Author из репозитория
      sale.sale_date = new Date(saleDto.sale_date); //заполняем поля объекта Author

      const tour = await this.tourRepository.findOne({
        //получаем массив Affiliation по id
        where: { id: saleDto.tour },
      });
      sale.tour = tour;

      const client = await this.clientRepository.findOne({
        //получаем массив Affiliation по id
        where: { id: saleDto.client },
      });
      sale.client = client;

      await this.saleRepository.save(sale); //сохраняем объект Author в БД
      return sale; //возвращаем объект Author
  }

  findOne(id: number): Promise<Sale> {
  // Promise<Author> - указывает, что функция возвращает объект Author в виде Promise (c асинхронного потока)
   return this.saleRepository.findOne({
     //получаем объект Author по id
     where: { id }, //указываем условие поиска по id
     relations: { tour: true, client: true}, //получаем связанные объекты
   });
 }

  async findAll(): Promise<Sale[]> {
    const sales = await this.saleRepository.find({
      //получаем связанные объекты
      relations: {
        tour: true,
        client: true
      },
    }); //получаем массив Author из БД
    return sales; //возвращаем массив Author
  }

  async update(id: number, updatedSale: Sale) {
    //получаем объект Author для обновления по id
    const sale = await this.saleRepository.findOne({ where: { id } }); //получаем объект Author по id из БД
    sale.sale_date = updatedSale.sale_date; //обновляем поля объекта Author
    sale.tour = updatedSale.tour;
    sale.client = updatedSale.client
    await this.saleRepository.save(sale); //сохраняем объект Author в БД
    return sale; //возвращаем объект Author
  }
  remove(id: number) {
    this.saleRepository.delete({ id }); //удаляем объект Author из БД
    return HttpStatus.OK;
  }
  async findIncomplete(): Promise<IncompleteSaleDto[]> {
    const sales = await this.saleRepository.find(
      {
        //получаем связанные объекты
        relations: {
          tour: true,
          client: true
        },
      }
    ); //получаем массив Author из БД
    const incompleteSales: IncompleteSaleDto[] = sales.map((sale) => {
      //преобразуем массив Author в массив IncompleteAuthorDto
      const incompleteSale = new IncompleteSaleDto();
      incompleteSale.sale_date = sale.sale_date;
      const sale_tour: Tour = sale.tour;
      incompleteSale.tour = sale_tour.id;
      return incompleteSale;
    });
    return incompleteSales; //возвращаем массив IncompleteAuthorDto
  }
}