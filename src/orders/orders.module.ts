import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { OrdersController } from './orders.controller';
import { Orders } from './orders.entity';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Orders,
    ]),
    UsersModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule { }
