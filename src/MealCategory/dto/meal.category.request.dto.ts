import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class MealCategoryRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name: string;
}