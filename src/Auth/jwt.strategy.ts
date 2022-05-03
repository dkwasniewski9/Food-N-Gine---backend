import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {UserResponseDto} from "../User/dto/user.response.dto";
import {JwtPayload} from "./dto/jwt.payload";
import {AuthService} from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRETKEY,
        });
    }

    async validate(payload: JwtPayload): Promise<UserResponseDto> {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}