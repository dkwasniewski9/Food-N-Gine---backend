import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class RestaurantRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly phoneNumber: string;

    @ApiProperty()
    readonly logo: string;

    @ApiProperty()
    readonly mondayOpenHour: Date;

    @ApiProperty()
    readonly mondayCloseHour: Date;

    @ApiProperty()
    readonly tuesdayOpenHour: Date;

    @ApiProperty()
    readonly tuesdayCloseHour: Date;

    @ApiProperty()
    readonly wednesdayOpenHour: Date;

    @ApiProperty()
    readonly wednesdayCloseHour: Date;

    @ApiProperty()
    readonly thursdayOpenHour: Date;

    @ApiProperty()
    readonly thursdayCloseHour: Date;

    @ApiProperty()
    readonly fridayOpenHour: Date;

    @ApiProperty()
    readonly fridayCloseHour: Date;

    @ApiProperty()
    readonly saturdayOpenHour: Date;

    @ApiProperty()
    readonly saturdayCloseHour: Date;

    @ApiProperty()
    readonly sundayOpenHour: Date;

    @ApiProperty()
    readonly sundayCloseHour: Date;

    @ApiProperty()
    @IsNotEmpty()
    readonly codes: string[];

    @ApiProperty()
    @IsNotEmpty()
    readonly websiteId: number;

    @ApiProperty()
    @IsNotEmpty()
    readonly addressId: number;

    @ApiProperty()
    @IsNotEmpty()
    readonly ownerId: number;

    @ApiProperty()
    @IsNotEmpty()
    readonly activityLegalRecordId: number;
}