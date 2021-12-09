import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordReset } from './reset-password.entity';
import { ResetPasswordService } from './reset-password.service';
import { MailerModule } from '@nestjs-modules/mailer'
import { MerchantsModule } from 'src/merchants/merchants.module';
import { ResetPasswordController } from './reset-password.controller';

@Module({
  imports: [
    MerchantsModule,
    MailerModule.forRoot({
      transport: {
        host: 'localhost',
        port: 1025
      },
      defaults: {
        from: 'no-reply@localhost.com'
      }
    }),
    TypeOrmModule.forFeature([
      PasswordReset,
    ]),
  ],
  controllers: [ResetPasswordController],
  providers: [ResetPasswordService,]
})
export class ResetPasswordModule { }
