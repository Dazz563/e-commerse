import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class UpdateUserDto {

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    first_name: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    last_name: string;

    @IsString()
    @IsOptional()
    address: string;

    @IsString()
    @IsOptional()
    contact_number: string;

    // @IsString()
    // @MinLength(6)
    // @MaxLength(32)
    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    //     message: 'password is too weak'
    // })
    // password: string;

    // @IsString()
    // @IsOptional()
    // confirm_password: string

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    role: string;
}