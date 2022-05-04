import {IsJSON, IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class WebsiteRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsJSON()
    readonly details: JSON;
}