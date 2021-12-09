import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordReset } from './reset-password.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ResetPasswordService {

    token: string;

    constructor(
        @InjectRepository(PasswordReset)
        private readonly repo: Repository<PasswordReset>,
    ) { }

    async create(email: string): Promise<PasswordReset> {

        this.token = uuidv4();
        const newReset = this.repo.create({ email, token: this.token });

        return await this.repo.save(newReset);
    }

    async findOne(token: string): Promise<PasswordReset> {
        return await this.repo.findOne({ token });
    }
}
