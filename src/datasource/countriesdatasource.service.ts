import { Injectable } from '@nestjs/common';
import { Country } from 'src/countries/country.entity';

@Injectable()
export class CountriesDatasourceService {
  private countries: Country[] = [
    // {   
    //     id: 1,
    //     name: "Германия",
    //     information: '-----',
    // },
    // {   
    //     id: 2,
    //     name: "Италия",
    //     information: '-----',
    // },
    // {   
    //     id: 3,
    //     name: "Аргентина",
    //     information: '-----',
    // }
  ];

  getCountries(): Country[] {
    return this.countries;
  }
}