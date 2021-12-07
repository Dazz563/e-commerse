import { Merchant } from "src/merchants/merchants.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    product_name: string;

    @Column()
    product_description: string;

    @Column()
    price: number;

    // productImg: string[];

    // @ManyToOne(() => Merchant, merchant => merchant.products, { eager: false })
    // merchant: Merchant;
}