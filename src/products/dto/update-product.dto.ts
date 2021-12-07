import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {

    @IsOptional()
    @IsString()
    product_name: string;

    @IsOptional()
    @IsString()
    product_description: string;

    @Transform(({ value }) => parseInt(value))
    @IsOptional()
    @IsNumber()
    price: number;

    // productImg: string[];
}