import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class CreateUserDto {

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    first_name: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    last_name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    contact_number: string;

    @IsString()
    @MinLength(6)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password is too weak'
    })
    password: string;

    @IsString()
    @IsNotEmpty()
    confirm_password: string

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    role: string;
}