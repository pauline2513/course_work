import { ApiProperty } from "@nestjs/swagger";

export class CreateCountryDto {
    @ApiProperty({example: 'Германия', description: 'Название страны'})
    name: string;
    @ApiProperty({example: 'Страна в Европе', description: 'Информация о стране'})
    information: string;
    @ApiProperty({example: '[1, 2]', description: 'Список идентификаторов туров'})
    tours: number[]
}