import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { SearchProductsDto } from './dto/search-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product)
        private repo: Repository<Product>
    ) { }

    async getProducts({ search }: SearchProductsDto): Promise<Product[]> {
        const query = this.repo.createQueryBuilder('product');

        if (search) {
            query.andWhere(
                // 'product.productName LIKE :search OR product.productDescription LIKE :search OR product.price LIKE :search',
                'LOWER(product.product_name) LIKE LOWER(:search) OR LOWER(product.product_description) LIKE LOWER(:search)',
                { search: `%${search}%` },
            )

        }

        const products = await query.getMany();

        return products;
    }

    async getProductById(id: string): Promise<Product> {
        const found = await this.repo.findOne(id);

        if (!found) {
            throw new NotFoundException('product not found');
        }

        return found;
    }

    async createProduct(
        { product_name, product_description, price }: CreateProductDto,
    ): Promise<Product> {

        const newProduct = this.repo.create({
            product_name,
            product_description,
            price,
        });

        await this.repo.save(newProduct);

        return newProduct;
    }

    async updateProduct(id: string, attrs: Partial<UpdateProductDto>): Promise<Product> {
        const product = await this.getProductById(id);

        Object.assign(product, attrs);

        await this.repo.save(product);

        return product;
    }

    async deleteProduct(id: string): Promise<void> {
        const result = await this.repo.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`product with ID ${id} not found`);
        }
    }

}
