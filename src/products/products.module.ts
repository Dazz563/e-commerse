import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MerchantsModule } from 'src/merchants/merchants.module';
import { Product } from './product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Product,
        ]),
        MerchantsModule,
    ],
    controllers: [
        ProductsController,
    ],
    providers: [
        ProductsService,
    ],
})
export class ProductsModule { }
