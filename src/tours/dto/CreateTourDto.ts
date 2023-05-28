import { ApiProperty } from "@nestjs/swagger";

export class CreateTourDto {
    @ApiProperty({example: 'Тур по Италии', description: 'Название тура'})
    tour_name: string;
    @ApiProperty({example: '2003-04-02', description: 'Дата начала тура'})
    date_start: Date;
    @ApiProperty({example: '2003-04-21', description: 'Дата конца тура'})
    date_end: Date;
    @ApiProperty({example: '20', description: 'Количество мест'})
    people_amount: number;
    @ApiProperty({example: '1', description: 'Идентификатор страны тура'})
    country: number;
    @ApiProperty({example: '[1, 2]', description: 'Индентификаторы продаж данного тура'})
    sales: number[]
  }