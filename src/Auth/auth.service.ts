import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from "../User/user.service";
import { JwtService } from "@nestjs/jwt";
import { RegisterRequestDto } from "./dto/register.request.dto";
import { LoginRequestDto } from "./dto/login.request.dto";
import { UserResponseDto } from "../User/dto/user.response.dto";
import { JwtPayload } from "./dto/jwt.payload";
import { LoginResponseDto } from "./dto/login.response.dto";
import { RegisterResponseDto } from "./dto/register.response.dto";
require('dotenv').config()

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService
    ) {
    }

    async register(registerRequestDto: RegisterRequestDto):
        Promise<RegisterResponseDto> {
        return await this.usersService.register(registerRequestDto);
    }

    async login(loginUserDto: LoginRequestDto): Promise<LoginResponseDto> {

        const user = await this.usersService.findByLogin(loginUserDto);

        const token = this._createToken(user);
        return await LoginResponseDto.of(user, token);
    }

    async validateUser(payload: JwtPayload): Promise<UserResponseDto> {
        const user = await this.usersService.findByPayload(payload);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    private _createToken({ id, role }: UserResponseDto): string {
        const user: JwtPayload = { id, role };
        return this.jwtService.sign(user);
    }
}
