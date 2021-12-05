import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    productName: string;

    @IsNotEmpty()
    @IsString()
    productDescription: string;

    // @Transform(({ value }) => parseInt(value))
    @IsNotEmpty()
    @IsNumber()
    price: number;

    // productImg: string[];
}