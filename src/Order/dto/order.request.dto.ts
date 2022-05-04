import {IsDateString, IsInt, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class OrderRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    readonly orderTime: Date;

    @ApiProperty()
    @IsNotEmpty()
    readonly price: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly comment: string;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    readonly clientId: number;

    @ApiProperty()
    @IsNotEmpty()
    readonly restaurantId: number;

    @ApiProperty()
    @IsNotEmpty()
    readonly addressId: number;

    @ApiProperty()
    @IsNotEmpty()
    readonly meals: number[];

    @ApiProperty()
    @IsNotEmpty()
    readonly mealsQuantity: number[];
}