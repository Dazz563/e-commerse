import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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
}