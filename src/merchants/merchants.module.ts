import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/users/auth.service';
import { MerchantsController } from './merchants.controller';
import { Merchant } from './merchants.entity';
import { MerchantsService } from './merchants.service';


@Module({
  imports: [
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: { expiresIn: '1d' }
    }),
    TypeOrmModule.forFeature([
      Merchant,
    ]),
  ],
  controllers: [MerchantsController],
  providers: [
    MerchantsService,
    AuthService,
  ],
  exports: []
})
export class MerchantsModule { }
