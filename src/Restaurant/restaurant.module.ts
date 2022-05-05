import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RestaurantController } from "./restaurant.controller";
import { Restaurant } from "./restaurant.entity";
import { RestaurantService } from "./restaurant.service";
import {Meal} from "../Meal/meal.entity";
import {Website} from "../Website/website.entity";
import {Address} from "../Address/address.entity";
import {User} from "../User/user.entity";
import {ActivityLegalRecord} from "../ActivityLegalRecord/activity.legal.record.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Restaurant, Meal, Website, Address, User, ActivityLegalRecord])
    ],
    controllers: [RestaurantController],
    providers: [RestaurantService]
})
export class RestaurantModule {

}