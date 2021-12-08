import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from 'src/users/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Orders } from './orders.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(
        private ordersService: OrdersService,
    ) { }

    @Get()
    getOrders() {
        return this.ordersService.getOrders();
    }

    @Post()
    createOrder(
        @Body() createOrderDto: CreateOrderDto,
        @GetUser() user: User,
    ): Promise<Orders> {
        return this.ordersService.createOrder(createOrderDto, user);
    }

    @Post('/test')
    testusers(@Req() req) {
        console.log(req);
    }


}
