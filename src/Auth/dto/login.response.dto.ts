import {UserRole} from "../../Shared/user.role.enum";
import {User} from "../../User/user.entity";
import {ApiProperty} from "@nestjs/swagger";

export class LoginResponseDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    token: string;
    @ApiProperty()
    role: UserRole;

    static async of(user: User, token: string): Promise<LoginResponseDto> {
        return {
            id: user.id,
            role: user.role,
            token: token
        }
    }
}