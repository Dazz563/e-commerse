import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { SearchProductsDto } from './dto/search-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(
        private productsService: ProductsService,
    ) { }

    @Get()
    getProducts(@Query() filterDto: SearchProductsDto): Promise<Product[]> {
        return this.productsService.getProducts(filterDto);
    }

    @Get('/:id')
    getProductById(@Param('id') id: string): Promise<Product> {
        return this.productsService.getProductById(id);
    }

    @Post()
    createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productsService.createProduct(createProductDto);
    }

    @Patch('/:id')
    updateProduct(@Param('id') id: string, @Body() updatedProduct: UpdateProductDto): Promise<Product> {
        return this.productsService.updateProduct(id, updatedProduct);
    }

    @Delete('/:id')
    async deleteProduct(@Param('id') id: string): Promise<void> {
        return this.productsService.deleteProduct(id);
    }


}
