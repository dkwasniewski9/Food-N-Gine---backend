import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Order} from "./order.entity";
import {OrderRequestDto} from "./dto/order.request.dto";
import {OrderResponseDto} from "./dto/order.response.dto";
import {Meal} from "../Meal/meal.entity";
import {OrderStatus} from "../Shared/order.status.enum";
import {User} from "../User/user.entity";
import {Address} from "../Address/address.entity";
import {Restaurant} from "../Restaurant/restaurant.entity";


@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(Meal)
        private readonly mealRepository: Repository<Meal>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>,
        @InjectRepository(Restaurant)
        private readonly restaurantRepository: Repository<Restaurant>
    ) {
    }


    async all(): Promise<OrderResponseDto[]> {
        const entities: Order[] = await this.orderRepository.find({
            relations: ['meals'],
        });
        return Promise.all(entities.map(e => OrderResponseDto.of(e)));
    }

    async one(id: number): Promise<OrderResponseDto> {
        const entity: Order = await this.orderRepository.findOne({
            relations: ['meals'],
            where: {id: id}
        });
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        return OrderResponseDto.of(entity);
    }

    async create(dto: OrderRequestDto): Promise<OrderResponseDto> {
        const entity: Order = new Order();
        if (dto.mealsQuantity.length != dto.meals.length) {
            throw new HttpException("Number of elements in meals and in mealsQuantity should be equal", HttpStatus.BAD_REQUEST);
        }
        if (await this.userRepository.findOne({
            where: {
                id: dto.clientId,
            }
        }) == null) {
            throw new HttpException("Client not found", HttpStatus.NOT_FOUND);
        }
        if (await this.addressRepository.findOne({
            where: {
                id: dto.addressId,
            }
        }) == null) {
            throw new HttpException("Address not found", HttpStatus.NOT_FOUND);
        }
        if (await this.restaurantRepository.findOne({
            where: {
                id: dto.restaurantId,
            }
        }) == null) {
            throw new HttpException("Restaurant not found", HttpStatus.NOT_FOUND);
        }
        entity.orderTime = dto.orderTime;
        entity.price = dto.price;
        entity.comment = dto.comment;
        entity.clientId = dto.clientId;
        entity.restaurantId = dto.restaurantId;
        entity.addressId = dto.addressId;
        entity.meals = [];
        for (const item of dto.meals) {
            const meal = await this.mealRepository.createQueryBuilder('meal').select('meal')
                .where('meal.Id = '.concat(item.toString())).getOne();
            if(meal == null){
                throw new HttpException("One of the meals not found", HttpStatus.NOT_FOUND);
            }
            entity.meals.push(meal);
        }
        entity.mealsQuantity = dto.mealsQuantity;
        const response = await this.orderRepository.save(entity);
        return OrderResponseDto.of(response);
    }

    async update(id: number, dto: OrderRequestDto): Promise<OrderResponseDto> {
        let entity = await this.orderRepository.findOne(id);
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        entity.meals = [];
        entity.orderTime = dto.orderTime;
        entity.price = dto.price;
        entity.comment = dto.comment;
        entity.clientId = dto.clientId;
        entity.restaurantId = dto.restaurantId;
        entity.addressId = dto.addressId;
        for (const item of dto.meals) {
            const meal = await this.mealRepository.createQueryBuilder('meal').select('meal')
                .where('meal.Id = '.concat(item.toString())).getOne();
            if(meal == null){
                throw new HttpException("One of the meals not found", HttpStatus.NOT_FOUND);
            }
            entity.meals.push(meal);
        }
        entity.mealsQuantity = dto.mealsQuantity;
        return OrderResponseDto.of(await this.orderRepository.save(entity));
    }

    async delete(id: number): Promise<void> {
        const entity = await this.orderRepository.findOne(id);
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        await this.orderRepository.remove(entity);
    }

    async statusCompleted(id: number, dto: OrderRequestDto) {
        let entity = await this.orderRepository.findOne(id);
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        entity.status = OrderStatus.COMPLETED;
        return OrderResponseDto.of(await this.orderRepository.save(entity));
    }

    async customer(clientId: number) {
        const entities: Order[] = await this.orderRepository.find({
                where: {clientId}

        });
        if (entities == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        return Promise.all(entities.map(e => OrderResponseDto.of(e)));
    }
}
