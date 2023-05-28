import { Injectable } from '@nestjs/common';
import { Tour } from 'src/tours/tour.entity';

@Injectable()
export class ToursDatasourceService {
  private tours: Tour[] = [
    // {
    //   id: 1,
    //   tour_name: 'Тур в Германию',
    //   date_start: new Date('23-01-2021'),
    //   date_end: new Date('01-01-2025'),
    //   people_amount: 30,
    //   country_id: 1,
    // },
    // {
    //   id: 2,
    //   tour_name: 'Тур в Аргентину',
    //   date_start: new Date('25-05-2021'),
    //   date_end: new Date('01-01-2025'),
    //   people_amount: 20,
    //   country_id: 3,
    // },
    // {
    //   id: 3,
    //   tour_name: 'Тур в Италию',
    //   date_start: new Date('16-03-2021'),
    //   date_end: new Date('01-01-2025'),
    //   people_amount: 10,
    //   country_id: 2,
    // }

  ];

  getTours(): Tour[] {
    return this.tours;
  }
}
