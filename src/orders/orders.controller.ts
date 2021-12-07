import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
    @UseGuards(AuthGuard())
    getOrders() {
        return this.ordersService.getOrders();
    }

    @Post()
    @UseGuards(AuthGuard())
    createOrder(
        @Body() createOrderDto: CreateOrderDto,
        @GetUser() user: User,
    ): Promise<Orders> {
        return this.ordersService.createOrder(createOrderDto, user);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    testusers(@Req() req) {
        console.log(req);
    }


}
