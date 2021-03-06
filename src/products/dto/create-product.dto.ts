import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    product_name: string;

    @IsNotEmpty()
    @IsString()
    product_description: string;

    @Transform(({ value }) => parseInt(value))
    @IsNotEmpty()
    @IsNumber()
    price: number;

    // productImg: string[];
}