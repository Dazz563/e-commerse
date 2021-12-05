import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {

    @IsOptional()
    @IsString()
    productName: string;

    @IsOptional()
    @IsString()
    productDescription: string;

    @Transform(({ value }) => parseInt(value))
    @IsOptional()
    @IsNumber()
    price: number;

    // productImg: string[];
}