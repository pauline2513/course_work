import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { Client } from './client.entity';
import { ClientsService } from './clents.service';
import { CreateClientDto } from './dto/CreateClientDto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('clients')
@ApiTags('Клиенты')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}

    @Get()
    findAll() {
        return this.clientsService.findAll();
    }
    @Get('incomplete')
    findIncomplete() {
        return this.clientsService.findIncomplete();
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.clientsService.findOne(+id);
    }
    @Put(':id')
    update(@Param('id') id: string, @Body() updateClient: Client) {
        return this.clientsService.update(+id, updateClient);
    }
    @ApiOperation({summary: "Создание клиента"})
    @Post()
    create(@Body() createClient: CreateClientDto) {
        return this.clientsService.create(createClient);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.clientsService.remove(+id);
    }
    


}