import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { Country } from './country.entity';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dto/CreateCountryDto';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';


@Controller('countries')
@ApiTags("Страны")
export class CountriesController {
    constructor(private readonly countriesService: CountriesService) {}

    @Get()
    findAll() {
        return this.countriesService.findAll();
    }
    @Get('incomplete')
    findIncomplete() {
        return this.countriesService.findIncomplete();
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.countriesService.findOne(+id);
    }
    @Put(':id')
    update(@Param('id') id: string, @Body() updateCountry: Country) {
        return this.countriesService.update(+id, updateCountry);
    }
    @ApiOperation({summary: "Создание страны"})
    @Post()
    create(@Body() createCountry: CreateCountryDto) {
        return this.countriesService.create(createCountry);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.countriesService.remove(+id);
    }
    

}