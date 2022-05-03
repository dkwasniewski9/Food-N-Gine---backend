import { Column, Entity, OneToMany } from "typeorm";
import { Order } from "../Order/order.entity";
import { Restaurant } from "../Restaurant/restaurant.entity";
import { AbstractEntity } from "../Shared/abstract.entity";


@Entity()
export class Website extends AbstractEntity {
    @Column({
        type: 'json',
        nullable: false
    })
    details: JSON;

    @OneToMany(type => Restaurant, restaurant => restaurant.website)
    restaurants: Restaurant[];

}