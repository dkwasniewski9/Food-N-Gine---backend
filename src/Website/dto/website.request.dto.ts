import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class WebsiteRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly details: JSON;
}