import { Module } from '@nestjs/common';
import { UserModule } from "../User/user.module";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from "./jwt.strategy";


@Module({
    imports: [
        UserModule,
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false,
        }),
        JwtModule.register({
            secret: process.env.SECRETKEY, signOptions: {
                expiresIn: process.env.EXPIRESIN,
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [
        PassportModule,
        JwtModule
    ],
})
export class AuthModule {
}
