import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/users/auth.service';
import { CurrentMerchantInterceptor } from './interceptors/current-merchant.interceptor';
import { MerchantsController } from './merchants.controller';
import { Merchant } from './merchants.entity';
import { MerchantsService } from './merchants.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Merchant,
    ]),
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
