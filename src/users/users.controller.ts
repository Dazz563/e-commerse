import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
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
    signin(
        @Body('email') email: string,
        @Body('password') password: string,
    ): Promise<User> {
        return this.usersService.signin(email, password);
    }

    @Get('/:id')
    findUserById(@Param('id') id: string) {
        return this.usersService.findUserById(id);
    }

    @Get()
    findUserByEmail(@Query('email') email: string) {
        return this.usersService.findUserByEmail(email);
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.updateUser(id, body);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.deleteUser(id);
    }

}
