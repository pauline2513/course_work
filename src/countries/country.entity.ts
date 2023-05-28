// export class Country {
//     id: number;
//     name: string;
//     information: string;
// }
import { ApiProperty } from '@nestjs/swagger';
import { Tour } from 'src/tours/tour.entity';

import {
  Column,
  Entity,
  
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('countries') //указываем что это не просто клаcс, а сущность в рамках TypeOrm, в БД будет храниться как таблица
export class Country {
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @PrimaryGeneratedColumn() //колонка - идентификатор, значение генерируется автоматически
  id: number;
  @ApiProperty({example: 'Германия', description: 'Название страны'})
  @Column({}) //колонка таблицы, сюда можно добавить большое количество параметров для БД, например тип, уникальность, триггер и т.д.
  name: string;
  @ApiProperty({example: 'Страна в Европе', description: 'Информация о стране'})
  @Column()
  information: string;
  
  @OneToMany((type) => Tour, (tour) => tour.country)
  @JoinTable({
    //join таблица 
    name: 'country_tour',
    joinColumn: { name: 'country_id' }, //для связи с идентификатором
    inverseJoinColumn: {name: 'tour_id'}
  })
  tours: Tour[]
}