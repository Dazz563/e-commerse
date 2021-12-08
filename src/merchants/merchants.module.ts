import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/users/auth.service';
import { CurrentMerchantInterceptor } from './interceptors/current-merchant.interceptor';
import { MerchantsController } from './merchants.controller';
import { Merchant } from './merchants.entity';
import { MerchantsService } from './merchants.service';
import { MailerModule } from '@nestjs-modules/mailer'


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Merchant,
    ]),
    MailerModule.forRoot({
      transport: {
        host: 'localhost',
        port: 1025
      },
      defaults: {
        from: 'no-reply@localhost.com'
      }
    }),
  ],
  controllers: [MerchantsController],
  providers: [
    MerchantsService,
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentMerchantInterceptor
    }
  ],
  exports: [MerchantsService, AuthService]
})
export class MerchantsModule { }
