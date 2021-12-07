import { Product } from "src/products/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Merchant {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    merchant_name: string;

    @Column()
    location: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @Column()
    contact_number: string;

    // @OneToMany(() => Product, product => product.merchant, { eager: true })
    // products: Product[];
}