import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany} from "typeorm";
import { Website } from "../Website/website.entity";
import { Order } from "../Order/order.entity";
import { Meal } from "../Meal/meal.entity";
import { Address } from "../Address/address.entity";
import { ActivityLegalRecord } from "../ActivityLegalRecord/activity.legal.record.entity";
import { AbstractEntity } from "../Shared/abstract.entity";
import { User } from "src/User/user.entity";

@Entity()
export class Restaurant extends AbstractEntity {
    @Column({
        type: 'varchar',
        nullable: false
    })
    name: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    phoneNumber: string;

    @Column({
        type: 'varchar',
        nullable: false,
        default: "default.png"
    })
    logo: string;

    @Column({
        type: 'time',
        nullable: true
    })
    mondayOpenHour: Date;

    @Column({
        type: 'time',
        nullable: true
    })
    mondayCloseHour: Date;

    @Column({
        type: 'time',
        nullable: true
    })
    tuesdayOpenHour: Date;

    @Column({
        type: 'time',
        nullable: true
    })
    tuesdayCloseHour: Date;

    @Column({
        type: 'time',
        nullable: true
    })
    wednesdayOpenHour: Date;

    @Column({
        type: 'time',
        nullable: true
    })
    wednesdayCloseHour: Date;

    @Column({
        type: 'time',
        nullable: true
    })
    thursdayOpenHour: Date;

    @Column({
        type: 'time',
        nullable: true
    })
    thursdayCloseHour: Date;

    @Column({
        type: 'time',
        nullable: true
    })
    fridayOpenHour: Date;

    @Column({
        type: 'time',
        nullable: true
    })
    fridayCloseHour: Date;

    @Column({
        type: 'time',
        nullable: true
    })
    saturdayOpenHour: Date;

    @Column({
        type: 'time',
        nullable: true
    })
    saturdayCloseHour: Date;

    @Column({
        type: 'time',
        nullable: true
    })
    sundayOpenHour: Date;

    @Column({
        type: 'time',
        nullable: true
    })
    sundayCloseHour: Date;

    @Column({
        type: 'varchar',
        nullable: false,
        array: true
    })
    codes: string[];


    @Column({
        type: 'integer',
        nullable: true
    })
    websiteId: number;

    @ManyToOne(type => Website, website => website.restaurants, {nullable: true})
    @JoinColumn({name: "websiteId"})
    website: Promise<Website>;

    @OneToMany(type => Order, order => order.client)
    orders: Order[];


    @OneToMany(type => Meal, meal => meal.mealCategory)
    meals: Meal[];

    @Column({
        type: 'integer',
        nullable: false
    })
    addressId: number;

    @ManyToOne(type => Address, address => address.restaurants)
    @JoinColumn({name: "addressId"})
    address: Promise<Address>;

    @Column({
        type: 'integer',
        nullable: false
    })
    ownerId: number;

    @ManyToOne(type => User, user => user.restaurants)
    @JoinColumn({name: "ownerId"})
    owner: Promise<User>;

    @Column({
        type: 'integer',
        nullable: false
    })
    activityLegalRecordId: number;

    @ManyToOne(type => ActivityLegalRecord, activityLegalRecord => activityLegalRecord.restaurants)
    @JoinColumn({name: "activityLegalRecordId"})
    activityLegalRecord: Promise<ActivityLegalRecord>;
}