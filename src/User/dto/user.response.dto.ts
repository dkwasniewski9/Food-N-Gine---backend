import {User} from "../user.entity";
import {UserRole} from "../../Shared/user.role.enum";
import {ApiProperty} from "@nestjs/swagger";
import {AddressResponseDto} from "../../Address/dto/address.response.dto";

export class UserResponseDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    email: string;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    role: UserRole;

    static async of(user: User): Promise<UserResponseDto> {
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
        }
    }
}

