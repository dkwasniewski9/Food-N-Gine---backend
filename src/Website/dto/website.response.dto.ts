import {Website} from "../website.entity";
import {ApiProperty} from "@nestjs/swagger";


export class WebsiteResponseDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    details: JSON;

    static async of(website: Website): Promise<WebsiteResponseDto> {
        return {
            id: website.id,
            details: website.details,
        }
    }
}

