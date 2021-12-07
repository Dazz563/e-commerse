import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {

    @IsNotEmpty()
    @IsString()
    product_name: string;

    @Transform(({ value }) => parseInt(value))
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @Transform(({ value }) => parseInt(value))
    @IsNotEmpty()
    @IsNumber()
    price: number;
}