import { ApiProperty } from "@nestjs/swagger";

export class CreateClientDto {
    @ApiProperty({example: 'Иван', description: 'Имя клиента'})
    name: string;
    @ApiProperty({example: 'Иванов', description: 'Фамилия клиента'})
    surname: string;
    @ApiProperty({example: 'qwerty@mail.ru', description: 'Почта клиента'})
    email_address: string;
    @ApiProperty({example: '89098765432', description: 'Телефонный номер клиента'})
    phone_number: string;
    @ApiProperty({example: 'г. Зеленоград, ул. Пушкина, д.34, кв. 1', description: 'Адрес проживания клиента'})
    address: string;
    @ApiProperty({example: '[1, 2]', description: 'Список идентификаторов покупок клиента'})
    sales: number[]
  }
  