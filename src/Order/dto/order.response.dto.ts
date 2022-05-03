import {Order} from "../order.entity";
import {UserResponseDto} from "../../User/dto/user.response.dto";
import {RestaurantResponseDto} from "../../Restaurant/dto/restaurant.response.dto";
import {AddressResponseDto} from "../../Address/dto/address.response.dto";
import {MealResponseDto} from "../../Meal/dto/meal.response.dto";


export class OrderResponseDto {
    id: number;
    orderTime: Date;
    status: string;
    price: number;
    comment: string;
    client: UserResponseDto;
    restaurant: RestaurantResponseDto;
    address: AddressResponseDto;
    meals: MealResponseDto[];
    mealsQuantity: number[];

    static async of(order: Order): Promise<OrderResponseDto> {
        return {
            id: order.id,
            orderTime: order.orderTime,
            status: order.status,
            price: order.price,
            comment: order.comment,
            client: await UserResponseDto.of(await order.client),
            restaurant: await RestaurantResponseDto.of(await order.restaurant),
            address: await AddressResponseDto.of(await order.address),
            meals: order.meals,
            mealsQuantity: order.mealsQuantity
        }
    }
}

