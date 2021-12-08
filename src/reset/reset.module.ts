import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResetController } from './reset.controller';
import { PasswordReset } from './reset.entity';
import { ResetService } from './reset.service';
import { MailerModule } from '@nestjs-modules/mailer'
import { MerchantsModule } from 'src/merchants/merchants.module';

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
  controllers: [ResetController],
  providers: [ResetService,]
})
export class ResetModule { }
