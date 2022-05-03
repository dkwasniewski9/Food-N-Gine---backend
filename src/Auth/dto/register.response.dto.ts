import {ApiProperty} from "@nestjs/swagger";

export class RegisterResponseDto {
    @ApiProperty()
    message: string

    static async of(message: string): Promise<RegisterResponseDto> {
        return {
            message: message
        }
    }
}