import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { OrderRequestDto } from "./dto/order.request.dto";
import { OrderResponseDto } from "./dto/order.response.dto";
import { OrderService } from "./order.service";

@Controller('orders')
@UseGuards(AuthGuard("jwt"))
export class OrderController {
    constructor(private readonly orderService: OrderService) {

    }

    @Post()
    @HttpCode(201)
    async create(@Body() dto: OrderRequestDto): Promise<OrderResponseDto> {
        return this.orderService.create(dto);
    }


    @Get()
    async all(): Promise<OrderResponseDto[]> {
        return await this.orderService.all();
    }

    @Get(":id")
    async one(@Param("id") id: number): Promise<OrderResponseDto> {
        return await this.orderService.one(id);
    }

    @Put(":id")
    async update(@Param("id") id: number, @Body() dto: OrderRequestDto)
        : Promise<OrderResponseDto> {
        return await this.orderService.update(id, dto);
    }

    @Delete(":id")
    @HttpCode(204)
    async delete(@Param("id") id: number): Promise<void> {
        await this.orderService.delete(id);
    }

    @Put("completed/:id")
    async statusCompleted(@Param("id") id: number, @Body() dto: OrderRequestDto)
        : Promise<OrderResponseDto> {
        return await this.orderService.statusCompleted(id, dto);
    }
    @Get("customer/:id")
    async customer(@Param("id") id: number): Promise<OrderResponseDto[]> {
        return await this.orderService.customer(id);
    }
}