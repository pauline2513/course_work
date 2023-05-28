import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { Sale } from './sale.entity';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/CreateSaleDto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('sales')
@ApiTags("Продажи")
export class SalesController {
    constructor(private readonly salesService: SalesService) {}

    @Get()
    findAll() {
        return this.salesService.findAll();
    }
    @Get('incomplete')
    findIncomplete() {
        return this.salesService.findIncomplete();
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.salesService.findOne(+id);
    }
    @Put(':id')
    update(@Param('id') id: string, @Body() updateSale: Sale) {
        return this.salesService.update(+id, updateSale);
    }
    @ApiOperation({summary: "Создание продажи"})
    @Post()
    create(@Body() createSale: CreateSaleDto) {
        return this.salesService.create(createSale);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.salesService.remove(+id);
    }
    

}