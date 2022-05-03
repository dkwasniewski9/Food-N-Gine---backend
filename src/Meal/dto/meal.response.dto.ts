import {Meal} from "../meal.entity";
import {ApiProperty} from "@nestjs/swagger";


export class MealResponseDto {
    @ApiProperty()
    readonly id: number;
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly description: string;
    @ApiProperty()
    readonly price: number;
    @ApiProperty()
    readonly photo: string;
    @ApiProperty()
    readonly restaurantId: number;

    static async of(meal: Meal): Promise<MealResponseDto> {
        return {
            id: meal.id,
            name: meal.name,
            description: meal.description,
            price: meal.price,
            photo: meal.photo,
            restaurantId: meal.restaurantId
        }
    }
}

