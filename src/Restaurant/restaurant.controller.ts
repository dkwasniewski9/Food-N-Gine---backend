import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {RestaurantRequestDto} from "./dto/restaurant.request.dto";
import {RestaurantResponseDto} from "./dto/restaurant.response.dto";
import {RestaurantService} from "./restaurant.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {imageFileFilter} from "../Shared/file-uploading.utils";
import {diskStorage} from 'multer';
import path from "path/posix";
import {MealResponseDto} from "../Meal/dto/meal.response.dto";

@Controller("restaurants")
@UseGuards(AuthGuard("jwt"))
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) {

    }

    @Post("/image/:id")
    @HttpCode(201)
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './files',
                filename: function editFileName(req, file, callback) {
                    const name = "restaurant";
                    const fileExtName = path.extname(file.originalname);
                    const randomName = Array(6)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('');
                    callback(null, `${name}-${randomName}${fileExtName}`);
                },
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async updateImage(@Param("id") id: number, @UploadedFile() file): Promise<RestaurantResponseDto> {
        return await this.restaurantService.updateImage(id, file);
    }

    @Post()
    @HttpCode(201)
    async create(@Body() dto: RestaurantRequestDto): Promise<RestaurantResponseDto> {
        return this.restaurantService.create(dto);
    }



    @Get()
    async all(): Promise<RestaurantResponseDto[]> {
        return await this.restaurantService.all();
    }

    @Get(":id")
    async one(@Param("id") id: number): Promise<RestaurantResponseDto> {
        return await this.restaurantService.one(id);
    }

    @Get("/search/:name")
    async filteredRestaurants(@Param("name") name: string): Promise<RestaurantResponseDto[]> {
        return await this.restaurantService.filteredRestaurants(name);
    }

    @Put(":id")
    async update(@Param("id") id: number, @Body() dto: RestaurantRequestDto)
        : Promise<RestaurantResponseDto> {
        return await this.restaurantService.update(id, dto);
    }

    @Delete(":id")
    @HttpCode(204)
    async delete(@Param("id") id: number): Promise<void> {
        await this.restaurantService.delete(id);
    }

    @Get("/categories/:id")
    async categories(@Param("id") id: number): Promise<RestaurantResponseDto[]> {
        return await this.restaurantService.categories(id);
    }

    @Get("/findByZipCode/:zipCode")
    async findZipCodes(@Param("zipCode") zipCode: string): Promise<RestaurantResponseDto[]> {
        return await this.restaurantService.findZipCodes(zipCode);
    }
}
