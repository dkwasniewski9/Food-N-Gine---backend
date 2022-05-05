import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {MealService} from "./meal.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {imageFileFilter} from "../Shared/file-uploading.utils";
import {diskStorage} from 'multer';
import path from "path/posix";
import {MealRequestDto} from "./dto/meal.request.dto";
import {MealResponseDto} from "./dto/meal.response.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Meals')
@Controller('meals')
@UseGuards(AuthGuard("jwt"))
export class MealController {
    constructor(private readonly mealService: MealService) {
    }

    @Post("/image/:id")
    @HttpCode(201)
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './files',
                filename: function editFileName(req, file, callback) {
                    const name = "meal";
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
    async updateImage(@Param("id") id: number, @UploadedFile() file): Promise<MealResponseDto> {
        return await this.mealService.updateImage(id, file);
    }

    @ApiOperation({
        summary: 'Create meal'
    })
    @ApiResponse({
        status: HttpStatus.CREATED,
        type: MealResponseDto,
    })
    @Post()
    @HttpCode(201)
    async create(@Body() dto: MealRequestDto): Promise<MealResponseDto> {
        return this.mealService.create(dto);
    }

    @ApiOperation({
        summary: 'Get all meals'
    })
    @Get()
    @ApiResponse({
        status: HttpStatus.OK,
        type: [MealResponseDto],
    })
    async all(): Promise<MealResponseDto[]> {
        return await this.mealService.all();
    }

    @ApiOperation({
        summary: 'Get meal'
    })
    @ApiResponse({
        status: HttpStatus.OK,
        type: MealResponseDto,
    })
    @Get(":id")
    async one(@Param("id") id: number): Promise<MealResponseDto> {
        return await this.mealService.one(id);
    }

    @Put(":id")
    async update(@Param("id") id: number, @Body() dto: MealRequestDto)
        : Promise<MealResponseDto> {
        return await this.mealService.update(id, dto);
    }

    @ApiOperation({
        summary: 'Delete meal'
    })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
    })
    @Delete(":id")
    @HttpCode(204)
    async delete(@Param("id") id: number): Promise<void> {
        await this.mealService.delete(id);
    }

    @Get("/menu/:id")
    async menu(@Param("id") id: number): Promise<MealResponseDto[]> {
        return await this.mealService.menu(id);
    }


}