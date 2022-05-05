import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Meal} from "./meal.entity";
import {MealRequestDto} from "./dto/meal.request.dto";
import {MealResponseDto} from "./dto/meal.response.dto";
import {MealCategory} from "../MealCategory/meal.category.entity";
import {Restaurant} from "../Restaurant/restaurant.entity";

@Injectable()
export class MealService {


    constructor(
        @InjectRepository(Meal)
        private readonly mealRepository: Repository<Meal>,
        @InjectRepository(MealCategory)
        private readonly mealCategoryRepository: Repository<MealCategory>,
        @InjectRepository(Restaurant)
        private readonly restaurantRepository: Repository<Restaurant>
    ) {
    }

    async updateImage(id: number, file): Promise<MealResponseDto> {
        let entity = await this.mealRepository.findOne(id);
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        try {
            entity.photo = file.filename;
        } catch (e) {
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
        if (await this.mealCategoryRepository.findOne({
            where: {
                id: dto.mealCategoryId,
            }
        }) == null) {
            throw new HttpException("Meal Category not found", HttpStatus.NOT_FOUND);
        }
        if (await this.restaurantRepository.findOne({
            where: {
                id: dto.restaurantId,
            }
        }) == null) {
            throw new HttpException("Restaurant not found", HttpStatus.NOT_FOUND);
        }
        const entity: Meal = new Meal();
        entity.name = dto.name;
        entity.description = dto.description;
        entity.price = dto.price;
        entity.restaurantId = dto.restaurantId;
        entity.mealCategoryId = dto.mealCategoryId;
        const response = await this.mealRepository.save(entity);
        return MealResponseDto.of(response);
        // return MealResponseDto.of(await this.mealRepository.save(this.mealRepository.create(entity)));
    }

    async update(id: number, dto: MealRequestDto): Promise<MealResponseDto> {
        let entity = await this.mealRepository.findOne(id);
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        if (await this.mealCategoryRepository.findOne({
            where: {
                id: dto.mealCategoryId,
            }
        }) == null) {
            throw new HttpException("Meal Category not found", HttpStatus.NOT_FOUND);
        }
        if (await this.restaurantRepository.findOne({
            where: {
                id: dto.restaurantId,
            }
        }) == null) {
            throw new HttpException("Restaurant not found", HttpStatus.NOT_FOUND);
        }
        entity.name = dto.name;
        entity.description = dto.description;
        entity.price = dto.price;
        entity.restaurantId = dto.restaurantId;
        entity.mealCategoryId = dto.mealCategoryId;
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
        const entities: Meal[] = await this.mealRepository.find({where: {restaurantId: Id}});
        return Promise.all(entities.map(e => MealResponseDto.of(e)));
    }


}
