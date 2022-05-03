import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class AddressRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly streetName: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly houseNumber: string;

    @ApiProperty()
    readonly doorNumber: number;

    @ApiProperty()
    @IsNotEmpty()
    readonly city: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly postCode: string;
}