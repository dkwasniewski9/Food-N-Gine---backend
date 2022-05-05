import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderController } from "./order.controller";
import { Order } from "./order.entity";
import { OrderService } from "./order.service";
import {Meal} from "../Meal/meal.entity";
import {Restaurant} from "../Restaurant/restaurant.entity";
import {User} from "../User/user.entity";
import {Address} from "../Address/address.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Order, Meal, User, Address, Restaurant])
    ],
    controllers: [OrderController],
    providers: [OrderService]
})
export class OrderModule {

}