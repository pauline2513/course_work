import { ApiProperty } from "@nestjs/swagger";

export class CreateSaleDto {
    @ApiProperty({example: '2003-04-02', description: 'Дата продажи'})
    sale_date: string;
    @ApiProperty({example: '1', description: 'Идентификатор тура'})
    tour: number;
    @ApiProperty({example: '2', description: 'Идентификатор клиента'})
    client: number;
}