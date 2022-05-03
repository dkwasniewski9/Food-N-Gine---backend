import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {WebsiteRequestDto} from "./dto/website.request.dto";
import {WebsiteResponseDto} from "./dto/website.response.dto";
import {WebsiteService} from "./website.service";

@Controller('websites')
@UseGuards(AuthGuard("jwt"))
export class WebsiteController {
    constructor(private readonly websiteService: WebsiteService) {

    }

    @Post()
    @HttpCode(201)
    async create(@Body() dto: WebsiteRequestDto): Promise<WebsiteResponseDto> {
        return this.websiteService.create(dto);
    }


    @Get()
    async all(): Promise<WebsiteResponseDto[]> {
        return await this.websiteService.all();
    }

    @Get(":id")
    async one(@Param("id") id: number): Promise<WebsiteResponseDto> {
        return await this.websiteService.one(id);
    }

    @Put(":id")
    async update(@Param("id") id: number, @Body() dto: WebsiteRequestDto)
        : Promise<WebsiteResponseDto> {
        return await this.websiteService.update(id, dto);
    }

    @Delete(":id")
    @HttpCode(204)
    async delete(@Param("id") id: number): Promise<void> {
        await this.websiteService.delete(id);
    }
}