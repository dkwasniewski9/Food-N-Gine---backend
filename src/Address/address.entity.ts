import { AbstractEntity } from "../Shared/abstract.entity";
import { User } from "src/User/user.entity";
import { Column, Entity, ManyToOne, OneToMany, } from "typeorm";
import { Order } from "../Order/order.entity";
import { Restaurant } from "../Restaurant/restaurant.entity";


@Entity()
export class Address extends AbstractEntity {
    @Column({
        type: 'varchar',
        nullable: false
    })
    streetName: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    houseNumber: string;

    @Column({
        type: 'integer',
        nullable: true
    })
    doorNumber: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    city: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    postCode: string;

    @OneToMany(type => Order, order => order.client)
    orders: Order[];

    @OneToMany(type => Restaurant, restaurant => restaurant.address)
    restaurants: Restaurant[];
}