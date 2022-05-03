import {BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany,} from "typeorm";
import { hash } from "bcrypt";
import { Order } from "../Order/order.entity";
import { Address } from "../Address/address.entity";
import { Restaurant } from "../Restaurant/restaurant.entity";
import { AbstractEntity } from "../Shared/abstract.entity";
import { UserRole } from "../Shared/user.role.enum";


@Entity()
export class User extends AbstractEntity {
    @Column({
        type: 'varchar',
        nullable: false
    })
    email: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    password: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    firstName: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    lastName: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.CUSTOMER,
        nullable: false
    })
    role: UserRole;

    @OneToMany(type => Order, order => order.client)
    orders: Order[];

    @OneToMany(type => Restaurant, restaurant => restaurant.owner)
    restaurants: Restaurant[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 10);
    }
}