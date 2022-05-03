import { Column, Entity, OneToMany, } from "typeorm";
import { Meal } from "../Meal/meal.entity";
import { AbstractEntity } from "../Shared/abstract.entity";


@Entity()
export class MealCategory extends AbstractEntity {
    @Column({
        type: 'varchar',
        nullable: false
    })
    name: string;

    @OneToMany(type => Meal, meal => meal.mealCategory)
    meals: Meal[];
}