import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ActivityLegalRecord} from "./activity.legal.record.entity";
import {ActivityLegalRecordRequestDto} from "./dto/activity.legal.record.request.dto";
import {ActivityLegalRecordResponseDto} from "./dto/activity.legal.record.response.dto";


@Injectable()
export class ActivityLegalRecordService {

    constructor(
        @InjectRepository(ActivityLegalRecord)
        private readonly activityLegalRecordRepository: Repository<ActivityLegalRecord>
    ) {
    }


    async all(): Promise<ActivityLegalRecordResponseDto[]> {
        const entities: ActivityLegalRecord[] = await this.activityLegalRecordRepository.find();
        return Promise.all(entities.map(e => ActivityLegalRecordResponseDto.of(e)));
    }

    async one(id: number): Promise<ActivityLegalRecordResponseDto> {
        const entity = await this.activityLegalRecordRepository.findOne(id);
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        return ActivityLegalRecordResponseDto.of(entity);
    }

    async create(dto: ActivityLegalRecordRequestDto): Promise<ActivityLegalRecordResponseDto> {
        const entity: ActivityLegalRecord = await this.activityLegalRecordRepository.save(this.activityLegalRecordRepository.create(dto));
        return ActivityLegalRecordResponseDto.of(entity);
    }

    async update(id: number, dto: ActivityLegalRecordRequestDto): Promise<ActivityLegalRecordResponseDto> {
        let entity = await this.activityLegalRecordRepository.findOne(id);
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        Object.assign(entity, dto);
        return ActivityLegalRecordResponseDto.of(await this.activityLegalRecordRepository.save(entity));
    }

    async delete(id: number): Promise<void> {
        const entity = await this.activityLegalRecordRepository.findOne(id);
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        await this.activityLegalRecordRepository.remove(entity);
    }
}
