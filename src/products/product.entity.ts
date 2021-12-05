import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    productName: string;

    @Column()
    productDescription: string;

    @Column()
    price: number;

    // productImg: string[];
}