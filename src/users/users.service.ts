import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private repo: Repository<User>,
        private authService: AuthService,
        private jwtService: JwtService,
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<void> {
        let { username, password, email, role } = createUserDto;
        password = await this.authService.encryptPassword(password);

        const user = this.repo.create({ username, password, email, role });

        try {
            await this.repo.save(user);
        }
        catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('username/email already exists');
            }
            else {
                throw new InternalServerErrorException()
            }
        }
    }

    async signin(email: string, password: string): Promise<{ accessToken: string }> {
        const user = await this.repo.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {

            const payload: JwtPayload = {
                username: user.username,
                role: user.role
            };

            const accessToken = await this.jwtService.sign(payload);
            return { accessToken };
        }
        else {
            throw new UnauthorizedException('please check your login credentails');
        }
    }
}
