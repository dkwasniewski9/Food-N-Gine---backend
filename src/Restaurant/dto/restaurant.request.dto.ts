import {IsDateString, IsNotEmpty, IsOptional, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class RestaurantRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(9, 9)
    readonly phoneNumber: string;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    readonly mondayOpenHour: Date;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    readonly mondayCloseHour: Date;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    readonly tuesdayOpenHour: Date;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    readonly tuesdayCloseHour: Date;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    readonly wednesdayOpenHour: Date;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    readonly wednesdayCloseHour: Date;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    readonly thursdayOpenHour: Date;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    readonly thursdayCloseHour: Date;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    readonly fridayOpenHour: Date;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    readonly fridayCloseHour: Date;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    readonly saturdayOpenHour: Date;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    readonly saturdayCloseHour: Date;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    readonly sundayOpenHour: Date;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
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