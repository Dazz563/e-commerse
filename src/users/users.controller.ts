import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(
        private usersService: UsersService,
    ) { }

    @Post('/signup')
    signup(@Body() createUserDto: CreateUserDto): Promise<void> {
        return this.usersService.createUser(createUserDto);
    }

    @Post('/signin')
    signin(@Body('email') email: string, @Body('password') password: string): Promise<{ accessToken: string }> {
        return this.usersService.signin(email, password);
    }
}
