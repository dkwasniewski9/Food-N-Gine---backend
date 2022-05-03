import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {ActivityLegalRecordService} from "./activity.legal.record.service";
import {ActivityLegalRecordRequestDto} from "./dto/activity.legal.record.request.dto";
import {ActivityLegalRecordResponseDto} from "./dto/activity.legal.record.response.dto";

@Controller('alr')
@UseGuards(AuthGuard("jwt"))
export class ActivityLegalRecordController {
    constructor(private readonly activityLegalRecordService: ActivityLegalRecordService) {
    }

    @Post()
    @HttpCode(201)
    async create(@Body() dto: ActivityLegalRecordRequestDto): Promise<ActivityLegalRecordResponseDto> {
        return this.activityLegalRecordService.create(dto);
    }


    @Get()
    async all(): Promise<ActivityLegalRecordResponseDto[]> {
        return await this.activityLegalRecordService.all();
    }

    @Get(":id")
    async one(@Param("id") id: number): Promise<ActivityLegalRecordResponseDto> {
        return await this.activityLegalRecordService.one(id);
    }

    @Put(":id")
    async update(@Param("id") id: number, @Body() dto: ActivityLegalRecordRequestDto)
        : Promise<ActivityLegalRecordResponseDto> {
        return await this.activityLegalRecordService.update(id, dto);
    }

    @Delete(":id")
    @HttpCode(204)
    async delete(@Param("id") id: number): Promise<void> {
        await this.activityLegalRecordService.delete(id);
    }
}
