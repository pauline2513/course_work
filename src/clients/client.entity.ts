// export class Client {
//     id: number;
//     name: string;
//     surname: string;
//     email_address: string;
//     phone_number: string;
//     address: string;
// }

import { ApiProperty } from '@nestjs/swagger';
import { Sale } from 'src/sales/sale.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('clients') //указываем что это не просто клаcс, а сущность в рамках TypeOrm, в БД будет храниться как таблица
export class Client {
  @ApiProperty({example: '1', description: "Уникальный идентификатор"})
  @PrimaryGeneratedColumn() //колонка - идентификатор, значение генерируется автоматически
  id: number;
  @ApiProperty({example: 'Иван', description: "Имя"})
  @Column() //колонка таблицы, сюда можно добавить большое количество параметров для БД, например тип, уникальность, триггер и т.д.
  name: string;
  @ApiProperty({example: 'Иванович', description: "Фамилия"})
  @Column()
  surname: string;
  @ApiProperty({example: 'qwe@gmail.com', description: "e-mail"})
  @Column()
  email_address: string;
  @ApiProperty({example: '+79514151616', description: "Номер телефона"})
  @Column()
  phone_number: string;
  @ApiProperty({example: 'г. Москва, улица Пушкина 24А', description: "Адрес"})
  @Column()
  address: string;

  @OneToMany(() => Sale, (sale) => sale.client)
  @JoinTable({
    //join таблица 
    name: 'client_sale',
    joinColumn: { name: 'client_id' }, //для связи с идентификатором автора
    inverseJoinColumn: {name: "sale_id"}
  })
  sales: Sale[]
}
