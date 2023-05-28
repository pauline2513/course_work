import { HttpStatus, Injectable } from "@nestjs/common";
import { ClientsDatasourceService } from "src/datasource/clientsdatasource.sevice";
import { Client } from "./client.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Sale } from "src/sales/sale.entity";
import { CreateClientDto } from "./dto/CreateClientDto";
import { IncompleteClientDto } from "./dto/incomplete-client.dto";

@Injectable()
export class ClientsService {


    constructor(
      @InjectRepository(Client)
      private readonly clientRepository: Repository<Client>, // "внедряем" репозиторий Author в сервис
      @InjectRepository(Sale)
      private readonly saleRepository: Repository<Sale>, // "внедряем" репозиторий Affiliation в сервис
    ) {}

    async create(clientDto: CreateClientDto): Promise<Client>
    {
        //получаем объект CreateAuthorDto
        const client = this.clientRepository.create(); //создаем объект Author из репозитория
        client.name = clientDto.name; //заполняем поля объекта Author
        client.surname = clientDto.surname;
        client.email_address = clientDto.email_address;
        client.phone_number = clientDto.phone_number;
        client.address = clientDto.address;
        const sales = await this.saleRepository.findBy({
          //получаем массив Affiliation по id
          id: In(clientDto.sales),
        });
        client.sales = sales;
        await this.clientRepository.save(client); //сохраняем объект Author в БД
        return client; //возвращаем объект Author
      }

    // create(client: Client) {
    //     this.datasourceService.getClients().push(client);
    // return client;
    // }
    // findOne(id: number) {
    //     return this.datasourceService
    //       .getClients()
    //       .find((client) => client.id === id);
    // }
    findOne(id: number): Promise<Client> {
      // Promise<Author> - указывает, что функция возвращает объект Author в виде Promise (c асинхронного потока)
      return this.clientRepository.findOne({
        //получаем объект Author по id
        where: { id }, //указываем условие поиска по id
        relations: { sales: true}, //получаем связанные объекты
      });
    }
  

    // findAll(): Client[] {
    //     return this.datasourceService.getClients();
    // }
    async findAll(): Promise<Client[]> {
      const clients = await this.clientRepository.find({
        //получаем связанные объекты
        relations: {
          sales: true,
        },
      }); //получаем массив Author из БД
      return clients; //возвращаем массив Author
    }
  
    // update(id: number, updatedClient: Client) {
    //     const index = this.datasourceService
    //       .getClients()
    //       .findIndex((client) => client.id === id);
    //     this.datasourceService.getClients()[index] = updatedClient;
    //     return this.datasourceService.getClients()[index];
    // }
    async update(id: number, updatedClient: Client) {
      //получаем объект Author для обновления по id
      const client = await this.clientRepository.findOne({ where: { id } }); //получаем объект Author по id из БД
      client.name = updatedClient.name; //обновляем поля объекта Author
      client.surname = updatedClient.surname;
      client.email_address = updatedClient.email_address;
      client.phone_number = updatedClient.phone_number;
      client.address = updatedClient.address;
      client.sales = updatedClient.sales
      await this.clientRepository.save(client); //сохраняем объект Author в БД
      return client; //возвращаем объект Author
    }
  

    remove(id: number) {
        this.clientRepository.delete({ id }); //удаляем объект Author из БД
        return HttpStatus.OK;
    }
    async findIncomplete(): Promise<IncompleteClientDto[]> {
      const clients = await this.clientRepository.find(); //получаем массив Author из БД
      const incompleteClients: IncompleteClientDto[] = clients.map((client) => {
        //преобразуем массив Author в массив IncompleteAuthorDto
        const incompleteClient = new IncompleteClientDto();
        incompleteClient.id = client.id;
        incompleteClient.name = client.name;
        incompleteClient.surname = client.surname;
        incompleteClient.phone_number = client.phone_number;
        return incompleteClient;
      });
      return incompleteClients; //возвращаем массив IncompleteAuthorDto
    }
  
    
}
