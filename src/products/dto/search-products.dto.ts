import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SearchProductsDto {
    @IsOptional()
    @IsNotEmpty()
    // @IsString()
    search: string;
}