import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {MealCategoryRequestDto} from "./dto/meal.category.request.dto";
import {MealCategoryResponseDto} from "./dto/meal.category.response.dto";
import {MealCategoryService} from "./meal.category.service"

@Controller("mealCategories")
@UseGuards(AuthGuard("jwt"))
export class MealCategoryController 
    {
        constructor(private readonly mealCategoryService: MealCategoryService) {

        }

        @Post()
        @HttpCode(201)
        async create(@Body() dto: MealCategoryRequestDto): Promise<MealCategoryResponseDto> {
            return this.mealCategoryService.create(dto);
        }


        @Get()
        async all(): Promise<MealCategoryResponseDto[]> {
            return await this.mealCategoryService.all();
        }

        @Get(":id")
        async one(@Param("id") id: number): Promise<MealCategoryResponseDto> {
            return await this.mealCategoryService.one(id);
        }

        @Put(":id")
        async update(@Param("id") id: number, @Body() dto: MealCategoryRequestDto)
            : Promise<MealCategoryResponseDto> {
            return await this.mealCategoryService.update(id, dto);
        }

        @Delete(":id")
        @HttpCode(204)
        async delete(@Param("id") id: number): Promise<void> {
            await this.mealCategoryService.delete(id);
        }
}
