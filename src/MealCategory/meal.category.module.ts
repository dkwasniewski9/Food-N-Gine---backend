import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MealCategory } from "./meal.category.entity"
import { MealCategoryController } from "./meal.category.controller"
import { MealCategoryService } from "./meal.category.service"

@Module({
    imports: [
        TypeOrmModule.forFeature([MealCategory])
    ],
    controllers: [MealCategoryController],
    providers: [MealCategoryService]
})
export class MealCategoryModule {

}