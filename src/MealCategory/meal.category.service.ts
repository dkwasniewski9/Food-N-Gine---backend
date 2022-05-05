import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {MealCategoryRequestDto} from "./dto/meal.category.request.dto";
import {MealCategory} from "./meal.category.entity"
import {MealCategoryResponseDto} from "./dto/meal.category.response.dto";


@Injectable()
export class MealCategoryService {

    constructor(
        @InjectRepository(MealCategory)
        private readonly mealCategoryRepository: Repository<MealCategory>
    ) {
    }


    async all(): Promise<MealCategoryResponseDto[]> {
        const entities: MealCategory[] = await this.mealCategoryRepository.find();
        return Promise.all(entities.map(e => MealCategoryResponseDto.of(e)));
    }

    async one(id: number): Promise<MealCategoryResponseDto> {
        const entity = await this.mealCategoryRepository.findOne(id);
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        return MealCategoryResponseDto.of(entity);
    }

    async create(dto: MealCategoryRequestDto): Promise<MealCategoryResponseDto> {
        const entity: MealCategory = new MealCategory();
        entity.name = dto.name;
        return MealCategoryResponseDto.of(await this.mealCategoryRepository.save(this.mealCategoryRepository.create(entity)));
    }

    async update(id: number, dto: MealCategoryRequestDto): Promise<MealCategoryResponseDto> {
        let entity = await this.mealCategoryRepository.findOne(id);
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        entity.name = dto.name;
        return MealCategoryResponseDto.of(await this.mealCategoryRepository.save(entity));
    }

    async delete(id: number): Promise<void> {
        const entity = await this.mealCategoryRepository.findOne(id);
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        await this.mealCategoryRepository.remove(entity);
    }
}
