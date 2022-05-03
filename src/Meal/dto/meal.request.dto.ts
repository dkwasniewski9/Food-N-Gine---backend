import {IsEmail, IsInt, IsNotEmpty, IsString, Max, MaxLength, Min, MIN} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Meal} from "../meal.entity";

export class MealRequestDto {
    @ApiProperty({
        maxLength: Meal.ColumnLength.NAME,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(Meal.ColumnLength.NAME)
    readonly name: string;

    @ApiProperty({
        maxLength: Meal.ColumnLength.DESCRIPTION,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(Meal.ColumnLength.DESCRIPTION)
    readonly description: string;

    @ApiProperty({
        minimum: 0,
        maximum: 3000000,
        example: 15,
    })
    @IsNotEmpty()
    readonly price: number;

    @ApiProperty()
    readonly photo: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly restaurantId: number;

    @ApiProperty()
    @IsNotEmpty()
    readonly mealCategoryId: number;
}