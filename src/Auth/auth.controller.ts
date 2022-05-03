import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {RegisterRequestDto} from "./dto/register.request.dto";
import {LoginRequestDto} from "./dto/login.request.dto";
import {LoginResponseDto} from "./dto/login.response.dto";
import {RegisterResponseDto} from "./dto/register.response.dto";
import {ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('register')
    @ApiResponse({status: 201, description: 'User registered', type: RegisterResponseDto})
    @ApiResponse({status: 404, description: 'User already exists'})
    public async register(@Body() registerUserDto: RegisterRequestDto,): Promise<RegisterResponseDto> {
        return await this.authService.register(registerUserDto);
    }

    @Post('login')
    @ApiResponse({status: 201, description: 'Login successful', type: LoginResponseDto})
    @ApiResponse({status: 403, description: 'Invalid credentials'})
    @ApiResponse({status: 404, description: 'User not found'})
    public async login(@Body() loginUserDto: LoginRequestDto): Promise<LoginResponseDto> {
        return await this.authService.login(loginUserDto);
    }
}
