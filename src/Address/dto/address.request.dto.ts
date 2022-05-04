import {IsIn, IsInt, isInt, IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class AddressRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly streetName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly houseNumber: string;

    @ApiProperty()
    @IsInt()
    readonly doorNumber: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly city: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly postCode: string;
}