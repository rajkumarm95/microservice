import { Orders } from '@app/orders';
import { User } from '@app/users';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      applicationName: 'EquipMe',
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '@Postgres123',
      database: 'microservice-demo',
      entities: [User, Orders],
      synchronize: true,
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
