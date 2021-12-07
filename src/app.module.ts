import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { MerchantsModule } from './merchants/merchants.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'e-commerse',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductsModule,
    UsersModule,
    MerchantsModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
