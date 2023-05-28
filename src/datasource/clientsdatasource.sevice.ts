import { Injectable } from '@nestjs/common';
import { Client } from 'src/clients/client.entity';

@Injectable()
export class ClientsDatasourceService {
  private clients: Client[] = [
    // {
    //   id: 1,
    //   name: 'Andrey',
    //   surname: 'Ivanov',
    //   email_address: 'aivanov@gmail.com',
    //   phone_number: '89512222333',
    //   address: '----',
    // },
    // {
    //   id: 2,
    //   name: 'Ivan',
    //   surname: 'Andreev',
    //   email_address: 'ivan_andreev@gmail.com',
    //   phone_number: '89765458909',
    //   address: 'г. Москва, пр-кт 60-летия Октября 11',
    // },
    // {
    //   id: 3,
    //   name: 'Maria',
    //   surname: 'Alekseeva',
    //   email_address: 'm_alekseeva@mail.ru',
    //   phone_number: '89128090101',
    //   address: 'г. Москва, пр-кт 60-летия Октября 15',
      
    // }
  ];

  getClients(): Client[] {
    return this.clients;
  }
}