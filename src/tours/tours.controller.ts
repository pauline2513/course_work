import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { Tour } from './tour.entity';
import { ToursService } from './tours.service';
import { CreateTourDto } from './dto/CreateTourDto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('tours')
@ApiTags("Туры")
export class ToursController {
    constructor(private readonly toursService: ToursService) {}

    @Get()
    findAll() {
        return this.toursService.findAll();
    }

    @Get('incomplete')
    findIncomplete() {
        return this.toursService.findIncomplete();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.toursService.findOne(+id);
    }
    @Put(':id')
    update(@Param('id') id: string, @Body() updateTour: Tour) {
        return this.toursService.update(+id, updateTour);
    }
    @ApiOperation({summary: "Создание тура"})
    @Post()
    create(@Body() createTour: CreateTourDto) {
        return this.toursService.create(createTour);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.toursService.remove(+id);
    }

    


    

    

    


}