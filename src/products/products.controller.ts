import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateProductDto } from './dto/create-product.dto';
import { SearchProductsDto } from './dto/search-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');

export const storage = {
    storage: diskStorage({
        destination: './uploads/productImages',
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
            const extension: string = path.parse(file.originalname).ext;

            cb(null, `${filename}${extension}`)
        }
    })
}

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

    @Post('/upload')
    @UseInterceptors(FilesInterceptor('image', 20, storage))
    async uploadMultipleFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
        // console.log(files);
        const response = [];
        files.forEach(file => {
            const fileReponse = {
                originalname: file.originalname,
                filename: file.filename,
            };
            response.push(fileReponse);
        });
        return response;
    }


}
