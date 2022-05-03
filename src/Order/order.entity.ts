import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne} from "typeorm";
import { Meal } from "../Meal/meal.entity";
import { Restaurant } from "../Restaurant/restaurant.entity";
import { Address } from "../Address/address.entity";
import { AbstractEntity } from "../Shared/abstract.entity";
import { User } from "src/User/user.entity";
import {UserRole} from "../Shared/user.role.enum";
import {OrderStatus} from "../Shared/order.status.enum";


@Entity()
export class Order extends AbstractEntity {
    @Column({
        type: 'timestamp',
        nullable: false
    })
    orderTime: Date;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.IN_PROGRESS,
        nullable: false
    })
    status: OrderStatus;

    @Column({
        type: 'integer',
        nullable: false
    })
    price: number;

    @Column({
        type: 'varchar',
        nullable: true
    })
    comment: string;

    @Column({
        type: 'integer',
        nullable: false
    })
    clientId: number;

    @Column({
        type: 'integer',
        array: true,
        nullable: false
    })
    mealsQuantity: number[];

    @ManyToOne(type => User, user => user.orders)
    @JoinColumn({name: "clientId"})
    client: Promise<User>;

    @Column({
        type: 'integer',
        nullable: false
    })
    restaurantId: number;

    @ManyToOne(type => Restaurant, restaurant => restaurant.orders)
    @JoinColumn({name: "restaurantId"})
    restaurant: Promise<Restaurant>;

    @Column({
        type: 'integer',
        nullable: false
    })
    addressId: number;

    @ManyToOne(type => Address, address => address.orders)
    @JoinColumn({name: "addressId"})
    address: Promise<Address>;

    @ManyToMany(type => Meal, meal => meal.orders)
    @JoinTable()
    meals: Meal[];

}