// export class Tour {
//     id: number;
//     tour_name: string;
//     date_start: Date;
//     date_end: Date;
//     people_amount: number;
//     country_id: number;

// }
import { ApiProperty } from '@nestjs/swagger';
import { Country } from 'src/countries/country.entity';
import { Sale } from 'src/sales/sale.entity';
import {
    Column,
    Entity,
    JoinTable,
    OneToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('tours') //указываем что это не просто клаcс, а сущность в рамках TypeOrm, в БД будет храниться как таблица
  export class Tour {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @PrimaryGeneratedColumn() //колонка - идентификатор, значение генерируется автоматически
    id: number;
    @ApiProperty({example: 'Тур по Италии', description: 'Название тура'})
    @Column()
    tour_name: string;
    @ApiProperty({example: '2003-04-02', description: 'Дата начала тура'})
    @Column()
    date_start: Date;
    @ApiProperty({example: '2003-04-21', description: 'Дата конца тура'})
    @Column()
    date_end: Date;
    @ApiProperty({example: '20', description: 'Количество мест'})
    @Column()
    people_amount: number;
  
    @ManyToOne((type) => Country, (country) => country.tours)
    @JoinTable({
      //join таблица 
      name: 'country_tour',
      joinColumn: { name: 'tour_id' }, 
      inverseJoinColumn: {name: 'country_id'}
    })
    country: Country
    @OneToMany((type) => Sale, (sale) => sale.tour)
    @JoinTable({
      //join таблица 
      name: 'sale_tour',
      joinColumn: { name: 'tour_id' }, 
      inverseJoinColumn: {name: 'sale_id'}
    })
    sales: Sale[]
    
  }