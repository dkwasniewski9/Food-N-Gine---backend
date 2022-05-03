import { AbstractEntity } from "../Shared/abstract.entity";
import { Column, Entity, ManyToOne, OneToMany, } from "typeorm";
import { Restaurant } from "../Restaurant/restaurant.entity";


@Entity()
export class ActivityLegalRecord extends AbstractEntity {
    @Column({
        type: 'integer',
        nullable: false
    })
    type: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    regon: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    krs: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    nip: string;

    @OneToMany(type => Restaurant, restaurant => restaurant.address)
    restaurants: Restaurant[];
}