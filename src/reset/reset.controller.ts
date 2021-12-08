import { Body, Controller, Post } from '@nestjs/common';
import { ResetService } from './reset.service';
import { MailerService } from '@nestjs-modules/mailer'

@Controller('reset')
export class ResetController {

    constructor(
        private resetPasswordService: ResetService,
        private mailerService: MailerService,
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
}
