import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne,} from "typeorm";
import { MealCategory } from "../MealCategory/meal.category.entity";
import { Restaurant } from "../Restaurant/restaurant.entity";
import { Order } from "../Order/order.entity";
import { AbstractEntity } from "../Shared/abstract.entity";


@Entity()
export class Meal extends AbstractEntity {

    static ColumnLength = {
        NAME: 255,
        DESCRIPTION: 1000
    }

    @Column({
        type: 'varchar',
        nullable: false,
        length: Meal.ColumnLength.NAME,
    })
    name: string;

    @Column({
        type: 'varchar',
        nullable: false,
        length: Meal.ColumnLength.DESCRIPTION,
    })
    description: string;

    @Column({
        type: 'integer',
        nullable: false
    })
    price: number;

    @Column({
        type: 'varchar',
        nullable: false,
        default: "default.png"
    })
    photo: string;

    @Column({
        type: 'integer',
        nullable: false
    })
    mealCategoryId: number;

    @ManyToOne(type => MealCategory, mealCategory => mealCategory.meals)
    @JoinColumn({name: "mealCategoryId"})
    mealCategory: Promise<MealCategory>;

    @Column({
        type: 'integer',
        nullable: false
    })
    restaurantId: number;

    @ManyToOne(type => Restaurant, restaurant => restaurant.meals)
    @JoinColumn({name: "restaurantId"})
    restaurant: Promise<Restaurant>;

    @ManyToMany(type => Order, order => order.meals, { cascade: true})
    orders: Order[];
}