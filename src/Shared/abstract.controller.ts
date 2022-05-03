import { Body, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { AbstractService } from "./abstract.service";

export abstract class AbstractController<TEntity, TRequestDto, TResponseDto> {
    constructor(private service: AbstractService<TEntity, TRequestDto, TResponseDto>) {
    }

    @Get()
    async all(): Promise<TResponseDto[]> {
        return await this.service.all();
    }

    @Get(":id")
    async one(@Param("id") id: number): Promise<TResponseDto> {
        return await this.service.one(id);
    }

    @Post()
    @HttpCode(201)
    async create(@Body() dto: TRequestDto): Promise<TResponseDto> {
        return this.service.create(dto);
    }

    @Put(":id")
    async update(@Param("id") id: number, @Body() dto: TRequestDto)
        : Promise<TResponseDto> {
        return await this.service.update(id, dto);
    }

    @Delete(":id")
    @HttpCode(204)
    async delete(@Param("id") id: number): Promise<void> {
        await this.service.delete(id);
    }
}
