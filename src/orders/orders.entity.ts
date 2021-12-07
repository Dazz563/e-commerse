import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Orders {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    quantity: number;

    @Column()
    product_name: string;

    @Column()
    price: number;

    @ManyToOne(() => User, user => user.orders, { eager: false })
    user: User;



    // many to one with users
    // many to many with products
}