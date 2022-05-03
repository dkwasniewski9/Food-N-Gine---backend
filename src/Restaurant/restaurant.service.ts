import {HttpException, HttpStatus, Injectable, Res} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Any, In, Like, Repository} from "typeorm";
import {Restaurant} from "./restaurant.entity";
import {RestaurantRequestDto} from "./dto/restaurant.request.dto";
import {RestaurantResponseDto} from "./dto/restaurant.response.dto";
import {MealCategoryResponseDto} from "../MealCategory/dto/meal.category.response.dto";
import {Meal} from "../Meal/meal.entity";
import {MealService} from "../Meal/meal.service";


@Injectable()
export class RestaurantService {

    constructor(
        @InjectRepository(Restaurant)
        private readonly restaurantRepository: Repository<Restaurant>,
    ) {
    }

    async updateImage(id: number, file): Promise<RestaurantResponseDto> {
        let entity = await this.restaurantRepository.findOne(id);
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        try {
            entity.logo = file.filename;
        } catch (e) {
            throw new HttpException("File Not Found", HttpStatus.NOT_FOUND);
        }
        return RestaurantResponseDto.of(await this.restaurantRepository.save(entity));
    }

    async all(): Promise<RestaurantResponseDto[]> {
        const entities: Restaurant[] = await this.restaurantRepository.find();
        return Promise.all(entities.map(e => RestaurantResponseDto.of(e)));
    }

    async one(id: number): Promise<RestaurantResponseDto> {
        const entity = await this.restaurantRepository.findOne(id);
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        return RestaurantResponseDto.of(entity);
    }

    async create(dto: RestaurantRequestDto): Promise<RestaurantResponseDto> {
        const entity: Restaurant = await this.restaurantRepository.save(this.restaurantRepository.create(dto));
        return RestaurantResponseDto.of(entity);
    }

    async update(id: number, dto: RestaurantRequestDto): Promise<RestaurantResponseDto> {
        let entity = await this.restaurantRepository.findOne(id);
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        Object.assign(entity, dto);
        return RestaurantResponseDto.of(await this.restaurantRepository.save(entity));
    }

    async delete(id: number): Promise<void> {
        const entity = await this.restaurantRepository.findOne(id);
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        await this.restaurantRepository.remove(entity);
    }

    async filteredRestaurants(name: string) {
        const entities: Restaurant[] = await this.restaurantRepository.find({
            where: {
                name: Like("%".concat(name).concat("%"))
            }
        });
        return Promise.all(entities.map(e => RestaurantResponseDto.of(e)));
    }

    async categories(id: number) {
        const restaurants: Restaurant[] = await this.restaurantRepository.find({
            where: {
                id: In(await this.categories2(id))
            }
        })
        return Promise.all(restaurants.map(e => RestaurantResponseDto.of(e)));
    }

    async categories2(id: number) {
        const entities = await this.restaurantRepository.createQueryBuilder().select('meal.restaurantId As id')
            .from(Meal, 'meal').where('meal.mealCategoryId = '.concat(id.toString())).distinct()
            .getRawMany();
        return entities.map((data) => data.id)
    }

    async findZipCodes(zipCode: string) {
        const entities: Restaurant[] = await this.restaurantRepository.createQueryBuilder("restaurant").select()
            .where(" :zipCode = ANY(codes)", {zipCode: zipCode}).getMany();
        return Promise.all(entities.map(e => RestaurantResponseDto.of(e)));
    }
}
