import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Session, UseGuards } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentMerchant } from './decorators/current-merchant.decorator';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { MerchantDto } from './dto/merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { MerchantGuard } from './guards/merchant.guard';
import { Merchant } from './merchants.entity';
import { MerchantsService } from './merchants.service';
import { MailerService } from '@nestjs-modules/mailer'
import { v4 as uuidv4 } from 'uuid';

@Controller('merchants')
@Serialize(MerchantDto)
export class MerchantsController {
    constructor(
        private merchantsService: MerchantsService,
        private mailerService: MailerService,

    ) { }

    @Get('/whoami')
    @UseGuards(MerchantGuard)
    whoAmI(@CurrentMerchant() merchant: Merchant) {
        return merchant;
    }

    @Post('/signup')
    async signup(
        @Body() createMerchantDto: CreateMerchantDto,
        @Session() session: any,
    ): Promise<Merchant> {
        const merchant = await this.merchantsService.createMerchant(createMerchantDto);
        session.userId = merchant;
        return merchant;
    }

    @Post('signin')
    async signin(
        @Body('email') email: string,
        @Body('password') password: string,
        @Session() session: any,

    ): Promise<Merchant> {
        const merchant = await this.merchantsService.signin(email, password);
        session.userId = merchant.id;
        return merchant;
    }

    @Post('/signout')
    @UseGuards(MerchantGuard)
    signout(@Session() session: any): void {
        session.userId = null;
    }

    @Get('/:id')
    @UseGuards(MerchantGuard)
    findMerchantById(@Param('id') id: string): Promise<Merchant> {
        return this.merchantsService.findMerchantById(id);
    }


    @Get()
    @UseGuards(MerchantGuard)
    findMerchantByEmail(@Query('email') email: string): Promise<Merchant> {
        return this.merchantsService.findMerchantByEmail(email);
    }

    @Patch('/:id')
    @UseGuards(MerchantGuard)
    updateUser(@Param('id') id: string, @Body() body: UpdateMerchantDto): Promise<Merchant> {
        return this.merchantsService.updateMerchant(id, body);
    }

    @Delete('/:id')
    @UseGuards(MerchantGuard)
    removeUser(@Param('id') id: string): Promise<void> {
        return this.merchantsService.deleteMerchant(id);
    }

    @Post('/forgot-password')
    @UseGuards(MerchantGuard)
    async forgotPassword(@Body('email') email: string,
        @CurrentMerchant() merchant: Merchant,
    ) {
        if (merchant.email !== email) {
            throw new NotFoundException('no user with this email exists')
        }

        // let token = uuidv4();
        // const url = `http://localhost:4200/reset${token}`;
        const url = `http://localhost:4200/reset`;


        await this.mailerService.sendMail({
            to: email,
            subject: 'Reset your password',
            html: `Click <a href="${url}">here</a> to reset your password!`
        })

        return {
            message: 'Check your email',
        }

    }
}
