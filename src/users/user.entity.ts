import { Orders } from "src/orders/orders.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    address: string;

    @Column()
    contact_number: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @Column({ unique: true })
    email: string;

    @OneToMany(() => Orders, orders => orders.user, { eager: true })
    orders: Orders[];
}