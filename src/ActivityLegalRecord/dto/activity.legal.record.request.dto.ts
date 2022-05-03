import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class ActivityLegalRecordRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly type: number;

    @ApiProperty()
    @IsNotEmpty()
    readonly regon: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly krs: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly nip: string;
}