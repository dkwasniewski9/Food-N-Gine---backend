import {IsEmail, IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class MealCategoryRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly name: string;
}