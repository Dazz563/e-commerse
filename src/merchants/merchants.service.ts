import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Merchant } from './merchants.entity';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/users/auth.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';



@Injectable()
export class MerchantsService {

    constructor(
        @InjectRepository(Merchant)
        private readonly repo: Repository<Merchant>,
        private authService: AuthService,

    ) { }

    async createMerchant(createMerchantDto: CreateMerchantDto): Promise<Merchant> {
        let { merchant_name, location, contact_number, password, confirm_password, email, role } = createMerchantDto;

        if (password !== confirm_password) {
            throw new BadRequestException('passwords do not match');
        }

        password = await this.authService.encryptPassword(password);

        const merchant = this.repo.create({ merchant_name, location, contact_number, password, email, role });

        try {
            await this.repo.save(merchant);

            return merchant;
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

    async signin(email: string, password: string) {
        const merchant = await this.repo.findOne({ email });

        if (merchant && (await bcrypt.compare(password, merchant.password))) {

            // const jwt = await this.jwtService.sign({ id: merchant.id, name: merchant.merchant_name })

            return merchant;
        }
        else {
            throw new UnauthorizedException('please check your login credentails');
        }
    }

    async findMerchantById(id: string): Promise<Merchant> {
        if (!id) {
            return null;
        }

        const merchant = await this.repo.findOne(id);

        if (!merchant) {
            throw new NotFoundException('merchant not found');
        }

        return merchant;
    }

    findMerchantByEmail(email: string): Promise<Merchant> {
        return this.repo.findOne({ email });
    }

    async updateMerchant(id: string, attrs: Partial<Merchant>): Promise<Merchant> {
        const user = await this.findMerchantById(id);

        if (!user) {
            throw new NotFoundException('user not found');
        }
        Object.assign(user, attrs);

        return this.repo.save(user);
    }

    async deleteMerchant(id: string): Promise<void> {
        const result = await this.repo.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`merchant with ID ${id} not found`);
        }
    }
}
