import { BadRequestException, Body, Controller, forwardRef, Inject, NotFoundException, Post } from '@nestjs/common';
import { ResetService } from './reset.service';
import { MailerService } from '@nestjs-modules/mailer'
import { MerchantsService } from 'src/merchants/merchants.service';
import { AuthService } from 'src/users/auth.service';


@Controller('reset')
export class ResetController {

    constructor(
        private resetPasswordService: ResetService,
        private mailerService: MailerService,
        private merchantsService: MerchantsService,
        // @Inject(forwardRef(() => AuthService))
        private authService: AuthService,
    ) { }

    @Post('/forgot')
    async forgotPassword(@Body('email') email: string) {

        await this.resetPasswordService.create(email);

        const url = `http://localhost:4200/reset${this.resetPasswordService.token}`

        await this.mailerService.sendMail({
            to: email,
            subject: 'Reset your password',
            html: `Click <a href="${url}">here</a> to reset your password!`
        })

        return {
            message: 'Check your email',
        }
    }

    @Post()
    async resetPassword(
        @Body('token') token: string,
        @Body('password') password: string,
        @Body('password_confirm') password_confirm: string,
    ) {

        if (password !== password_confirm) {
            throw new BadRequestException('passwords do not match');
        }

        const reset = await this.resetPasswordService.findOne({ token });

        const email = reset.email;

        const user = await this.merchantsService.findMerchantByEmail(email);


        if (!user) {
            throw new NotFoundException('user not found');
        }

        const newPassword = await this.authService.encryptPassword(password);

        this.merchantsService.updateMerchant(user.id, { password: newPassword })

    }
}
