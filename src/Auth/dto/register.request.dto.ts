import {IsEmail, IsEnum, IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {UserRole} from "../../Shared/user.role.enum";

export class RegisterRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly lastName: string;

    @ApiProperty()
    @IsEnum(UserRole)
    readonly role: UserRole;
}