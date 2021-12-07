import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'http';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
        @Req() request,
    ): Promise<{ accessToken: string }> {
        return this.usersService.signin(email, password);
    }

    @Get('/:id')
    @UseGuards(AuthGuard())
    findUserById(@Param('id') id: string) {
        return this.usersService.findUserById(id);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    testusers(@Req() req) {
        console.log(req);
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
