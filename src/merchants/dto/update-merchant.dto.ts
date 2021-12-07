import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UpdateMerchantDto {
    @IsOptional()
    @IsString()
    merchant_name: string;

    @IsOptional()
    @IsString()
    location: string;

    @IsOptional()
    @IsString()
    contact_number: string;

    // @IsOptional()
    // @IsString()
    // @MinLength(6)
    // @MaxLength(32)
    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    //     message: 'password is too weak'
    // })
    // password: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    role: string;
}