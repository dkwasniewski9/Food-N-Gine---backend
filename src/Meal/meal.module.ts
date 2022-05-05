import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MealController } from "./meal.controller";
import { Meal } from "./meal.entity";
import { MealService } from "./meal.service";
import {MealCategory} from "../MealCategory/meal.category.entity";
import {Restaurant} from "../Restaurant/restaurant.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Meal, MealCategory, Restaurant])
    ],
    controllers: [MealController],
    providers: [MealService]
})
export class MealModule {

}