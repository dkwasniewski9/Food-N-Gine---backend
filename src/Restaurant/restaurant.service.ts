import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {In, Like, Repository} from "typeorm";
import {Restaurant} from "./restaurant.entity";
import {RestaurantRequestDto} from "./dto/restaurant.request.dto";
import {RestaurantResponseDto} from "./dto/restaurant.response.dto";
import {Meal} from "../Meal/meal.entity";
import {Website} from "../Website/website.entity";
import {Address} from "../Address/address.entity";
import {User} from "../User/user.entity";
import {ActivityLegalRecord} from "../ActivityLegalRecord/activity.legal.record.entity";


@Injectable()
export class RestaurantService {

    constructor(
        @InjectRepository(Restaurant)
        private readonly restaurantRepository: Repository<Restaurant>,
        @InjectRepository(Meal)
        private readonly mealRepository: Repository<Meal>,
        @InjectRepository(Website)
        private readonly websiteRepository: Repository<Website>,
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(ActivityLegalRecord)
        private readonly alrRepository: Repository<ActivityLegalRecord>,
    ) {
    }

    async updateImage(id: number, file): Promise<RestaurantResponseDto> {
        let entity = await this.restaurantRepository.findOne(id);
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        if(file == null){
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
        if (await this.websiteRepository.findOne({
            where: {
                id: dto.websiteId,
            }
        }) == null) {
            throw new HttpException("Website not found", HttpStatus.NOT_FOUND);
        }
        if (await this.addressRepository.findOne({
            where: {
                id: dto.addressId,
            }
        }) == null) {
            throw new HttpException("Address not found", HttpStatus.NOT_FOUND);
        }
        if (await this.userRepository.findOne({
            where: {
                id: dto.ownerId,
            }
        }) == null) {
            throw new HttpException("Owner not found", HttpStatus.NOT_FOUND);
        }
        if (await this.alrRepository.findOne({
            where: {
                id: dto.activityLegalRecordId,
            }
        }) == null) {
            throw new HttpException("Activity Legal Record not found", HttpStatus.NOT_FOUND);
        }
        const entity: Restaurant = new Restaurant();
        entity.name = dto.name;
        entity.phoneNumber = dto.phoneNumber;
        entity.mondayCloseHour = dto.mondayCloseHour;
        entity.mondayOpenHour = dto.mondayOpenHour;
        entity.tuesdayCloseHour = dto.tuesdayCloseHour;
        entity.tuesdayOpenHour = dto.tuesdayOpenHour;
        entity.wednesdayCloseHour = dto.wednesdayCloseHour;
        entity.wednesdayOpenHour = dto.wednesdayOpenHour;
        entity.thursdayCloseHour = dto.thursdayCloseHour;
        entity.thursdayOpenHour = dto.thursdayOpenHour;
        entity.fridayCloseHour = dto.fridayCloseHour;
        entity.fridayOpenHour = dto.fridayOpenHour;
        entity.saturdayCloseHour = dto.saturdayCloseHour;
        entity.saturdayOpenHour = dto.saturdayOpenHour;
        entity.sundayCloseHour = dto.sundayCloseHour;
        entity.sundayOpenHour = dto.sundayOpenHour;
        entity.codes = dto.codes;
        entity.websiteId = dto.websiteId;
        entity.addressId = dto.addressId;
        entity.ownerId = dto.ownerId;
        entity.activityLegalRecordId = dto.activityLegalRecordId;
        const response = await this.restaurantRepository.save(entity);
        return RestaurantResponseDto.of(response);
    }

    async update(id: number, dto: RestaurantRequestDto): Promise<RestaurantResponseDto> {
        let entity = await this.restaurantRepository.findOne(id);
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        if (await this.websiteRepository.findOne({
            where: {
                id: dto.websiteId,
            }
        }) == null) {
            throw new HttpException("Website not found", HttpStatus.NOT_FOUND);
        }
        if (await this.addressRepository.findOne({
            where: {
                id: dto.addressId,
            }
        }) == null) {
            throw new HttpException("Address not found", HttpStatus.NOT_FOUND);
        }
        if (await this.userRepository.findOne({
            where: {
                id: dto.ownerId,
            }
        }) == null) {
            throw new HttpException("Owner not found", HttpStatus.NOT_FOUND);
        }
        if (await this.alrRepository.findOne({
            where: {
                id: dto.activityLegalRecordId,
            }
        }) == null) {
            throw new HttpException("Activity Legal Record not found", HttpStatus.NOT_FOUND);
        }
        entity.name = dto.name;
        entity.phoneNumber = dto.phoneNumber;
        entity.mondayCloseHour = dto.mondayCloseHour;
        entity.mondayOpenHour = dto.mondayOpenHour;
        entity.tuesdayCloseHour = dto.tuesdayCloseHour;
        entity.tuesdayOpenHour = dto.tuesdayOpenHour;
        entity.wednesdayCloseHour = dto.wednesdayCloseHour;
        entity.wednesdayOpenHour = dto.wednesdayOpenHour;
        entity.thursdayCloseHour = dto.thursdayCloseHour;
        entity.thursdayOpenHour = dto.thursdayOpenHour;
        entity.fridayCloseHour = dto.fridayCloseHour;
        entity.fridayOpenHour = dto.fridayOpenHour;
        entity.saturdayCloseHour = dto.saturdayCloseHour;
        entity.saturdayOpenHour = dto.saturdayOpenHour;
        entity.sundayCloseHour = dto.sundayCloseHour;
        entity.sundayOpenHour = dto.sundayOpenHour;
        entity.codes = dto.codes;
        entity.websiteId = dto.websiteId;
        entity.addressId = dto.addressId;
        entity.ownerId = dto.ownerId;
        entity.activityLegalRecordId = dto.activityLegalRecordId;
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
        const entities = await this.mealRepository.createQueryBuilder('meal').select('meal.restaurantId As id').
        where('meal.mealCategoryId = '.concat(id.toString())).distinct()
            .getRawMany();
        return entities.map((data) => data.id)
    }

    async findZipCodes(zipCode: string) {
        const entities: Restaurant[] = await this.restaurantRepository.createQueryBuilder("restaurant").select()
            .where(" :zipCode = ANY(codes)", {zipCode: zipCode}).getMany();
        return Promise.all(entities.map(e => RestaurantResponseDto.of(e)));
    }
}
