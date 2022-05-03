import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Meal } from "./meal.entity";
import { MealRequestDto } from "./dto/meal.request.dto";
import { MealResponseDto } from "./dto/meal.response.dto";
import {MealCategory} from "../MealCategory/meal.category.entity";
import {MealCategoryResponseDto} from "../MealCategory/dto/meal.category.response.dto";
import {Restaurant} from "../Restaurant/restaurant.entity";

@Injectable()
export class MealService{


    constructor(
        @InjectRepository(Meal)
        private readonly mealRepository: Repository<Meal>
    ) {
    }

    async updateImage(id: number, file): Promise<MealResponseDto> {
        let entity = await this.mealRepository.findOne(id);
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        try {
            entity.photo = file.filename;
        }
        catch(e){
            throw new HttpException("File Not Found", HttpStatus.NOT_FOUND);
        }
        return MealResponseDto.of(await this.mealRepository.save(entity));
    }


    async all(): Promise<MealResponseDto[]> {
        const entities: Meal[] = await this.mealRepository.find();
        return Promise.all(entities.map(e => MealResponseDto.of(e)));
    }

    async one(id: number): Promise<MealResponseDto> {
        const entity = await this.mealRepository.findOne(id);
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        return MealResponseDto.of(entity);
    }

    async create(dto: MealRequestDto): Promise<MealResponseDto> {
        const entity: Meal = await this.mealRepository.save(this.mealRepository.create(dto));
        return MealResponseDto.of(entity);
    }

    async update(id: number, dto: MealRequestDto): Promise<MealResponseDto> {
        let entity = await this.mealRepository.findOne(id);
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        Object.assign(entity, dto);
        return MealResponseDto.of(await this.mealRepository.save(entity));
    }

    async delete(id: number): Promise<void> {
        const entity = await this.mealRepository.findOne(id);
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        await this.mealRepository.remove(entity);
    }

    async menu(Id: number) {
        const entities: Meal[] = await this.mealRepository.find({ where: { restaurantId: Id } });
        return Promise.all(entities.map(e => MealResponseDto.of(e)));
    }



}
