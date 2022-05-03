import { MealCategory } from "../meal.category.entity"


export class MealCategoryResponseDto {
    id: number;
    name: string;

    static async of(mealCategory: MealCategory): Promise<MealCategoryResponseDto> {
        return {
            id: mealCategory.id,
            name: mealCategory.name,
        }
    }
}

