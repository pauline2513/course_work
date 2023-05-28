import { Module } from '@nestjs/common';
import { ToursModule } from './tours/tours.module';
import { ToursDatasourceModule } from './datasource/toursdatasource.module';
import { ClientsModule } from './clients/clents.module';
import { ClientsDatasourceModule } from './datasource/clientsdatasourse.module';
import { CountriesModule } from './countries/countries.module';
import { CountriesDatasourceModule } from './datasource/countriesdatasource.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesModule } from './sales/sales.module';
import { SalesDatasourceModule } from './datasource/salesdatasource.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';


@Module({
  imports: [TokenModule,AuthModule, UsersModule, SalesModule, SalesDatasourceModule, ToursModule, ToursDatasourceModule, ClientsModule, ClientsDatasourceModule, CountriesModule, CountriesDatasourceModule,
    TypeOrmModule.forRoot({
      type: 'postgres', //тип подключаемой БД
      port: 5432, //порт
      database: 'education',
      username: 'postgres', //имя пользователя
      password: '12345', //пароль
      host: 'localhost', //хост, в нашем случае БД развернута локально
      synchronize: true, //отключаем автосинхронизацию(в противном случае при каждом перезапуске наша БД будет создаваться заново)
      logging: 'all', //включим логирование для удобства отслеживания процессов
	  entities: ['dist/**/*.entity{.ts,.js}'], //указываем путь к сущностям
    }),
],
  controllers: [],
  providers: [],

})
export class AppModule {}
