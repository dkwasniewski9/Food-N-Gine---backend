import {Controller, Get, UseGuards} from '@nestjs/common';
import {UserResponseDto} from "./dto/user.response.dto";
import {AuthGuard} from "@nestjs/passport";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public async getAll(): Promise<UserResponseDto[]> {
        return await this.userService.findAll();
    }
}
