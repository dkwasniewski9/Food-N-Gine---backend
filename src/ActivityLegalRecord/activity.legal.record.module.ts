import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ActivityLegalRecord } from "./activity.legal.record.entity"
import { ActivityLegalRecordController } from "./activity.legal.record.controller"
import { ActivityLegalRecordService } from "./activity.legal.record.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([ActivityLegalRecord])
    ],
    controllers: [ActivityLegalRecordController],
    providers: [ActivityLegalRecordService]
})
export class ActivitylegalRecordModule {
}