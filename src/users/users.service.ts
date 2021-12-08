import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
        private authService: AuthService,
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<void> {
        let { first_name, last_name, contact_number, address, password, confirm_password, email, role } = createUserDto;

        if (password !== confirm_password) {
            throw new BadRequestException('passwords do not match');
        }

        password = await this.authService.encryptPassword(password);

        const user = this.repo.create({ first_name, last_name, contact_number, address, password, email, role });



        try {
            await this.repo.save(user);
        }
        catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('email already exists');
            }
            else {
                throw new InternalServerErrorException()
            }
        }
    }

    async signin(email: string, password: string): Promise<User> {
        const user = await this.repo.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {

            return user;
        }
        else {
            throw new UnauthorizedException('please check your login credentails');
        }
    }

    async findUserById(id: string) {
        if (!id) {
            return null;
        }

        const user = await this.repo.findOne(id);

        if (!user) {
            throw new NotFoundException('user not found');
        }

        return user;
    }

    findUserByEmail(email: string) {
        return this.repo.find({ email });
    }

    async updateUser(id: string, attrs: Partial<User>) {
        const user = await this.findUserById(id);

        if (!user) {
            throw new NotFoundException('user not found');
        }
        Object.assign(user, attrs);

        return this.repo.save(user);
    }

    async deleteUser(id: string): Promise<void> {
        const result = await this.repo.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`merchant with ID ${id} not found`);
        }
    }
}
