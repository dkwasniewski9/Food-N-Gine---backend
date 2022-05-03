import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserResponseDto} from "./dto/user.response.dto";
import {LoginRequestDto} from "../Auth/dto/login.request.dto";
import {compare} from "bcrypt";
import {RegisterRequestDto} from "../Auth/dto/register.request.dto";
import {RegisterResponseDto} from "../Auth/dto/register.response.dto";
import {JwtPayload} from "../Auth/dto/jwt.payload";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
    }

    async findByLogin({email, password}: LoginRequestDto): Promise<User> {
        const user = await this.userRepository.findOne({where: {email}});

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        const areEqual = await compare(password, user.password);
        if (!areEqual) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        return user;
    }

    async findByPayload({id, role}: JwtPayload): Promise<UserResponseDto> {
        return await this.userRepository.findOne({
            where: {id, role}
        });
    }

    async register(registerRequestDto: RegisterRequestDto): Promise<RegisterResponseDto> {
        const {email, password, firstName, lastName, role} = registerRequestDto;
        const userInDb = await this.userRepository.findOne({
            where: {email}
        });
        if (userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        const user: User = await this.userRepository.create({email, password, firstName, lastName, role});
        await this.userRepository.save(user);
        return await RegisterResponseDto.of("User registered");
    }

    async findAll(): Promise<UserResponseDto[]> {
        const users = await this.userRepository.find();
        return Promise.all(users.map(user => UserResponseDto.of(user)));
    }
}






