import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Orders } from './orders.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Orders)
        private readonly repo: Repository<Orders>,
    ) { }

    async getOrders(): Promise<Orders[]> {
        const query = this.repo.createQueryBuilder('orders');

        // if (search) {
        //     query.andWhere(
        //         // 'product.productName LIKE :search OR product.productDescription LIKE :search OR product.price LIKE :search',
        //         'LOWER(product.product_name) LIKE LOWER(:search) OR LOWER(product.product_description) LIKE LOWER(:search)',
        //         { search: `%${search}%` },
        //     )

        // }

        const products = await query.getMany();

        return products;
    }

    async createOrder({ product_name, quantity, price }: CreateOrderDto, user: User): Promise<Orders> {

        const newOrder = this.repo.create({
            product_name,
            quantity,
            price,
            user,
        });

        await this.repo.save(newOrder);

        return newOrder;
    }
}
