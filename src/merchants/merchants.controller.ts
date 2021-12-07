import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { MerchantsService } from './merchants.service';

@Controller('merchants')
export class MerchantsController {
    constructor(
        private merchantsService: MerchantsService,
    ) { }

    @Post('/signup')
    signup(@Body() createMerchantDto: CreateMerchantDto): Promise<void> {
        return this.merchantsService.createMerchant(createMerchantDto);
    }

    @Post('signin')
    async signin(
        @Body('email') email: string,
        @Body('password') password: string,
        // @Res() response: Response,
    ) {
        return this.merchantsService.signin(email, password);
    }

    // @Post('/signin')
    // signin(
    //     @Body('email') email: string,
    //     @Body('password') password: string,
    // ): Promise<{ accessToken: string }> {

    //     return this.merchantsService.signin(email, password);
    // }

    // Possibly for Admin controller
    @Get('/:id')
    findMerchantById(@Param('id') id: string) {
        return this.merchantsService.findMerchantById(id);
    }

    // Possibly for Admin controller
    @Get()
    findMerchantByEmail(@Query('email') email: string) {
        return this.merchantsService.findMerchantByEmail(email);
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateMerchantDto) {
        return this.merchantsService.updateMerchant(id, body);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.merchantsService.deleteMerchant(id);
    }
}
