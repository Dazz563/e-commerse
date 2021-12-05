import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  providers: [
    AuthService,
    UsersService,
  ],
  controllers: [
    UsersController,
  ],
})
export class UsersModule { }
