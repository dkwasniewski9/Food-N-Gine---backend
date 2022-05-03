import { ActivityLegalRecord } from "../activity.legal.record.entity"


export class ActivityLegalRecordResponseDto {
    id: number;
    type: number;
    regon: string;
    krs: string;
    nip: string;

    static async of(activityLegalRecord: ActivityLegalRecord): Promise<ActivityLegalRecordResponseDto> {
        return {
            id: activityLegalRecord.id,
            type: activityLegalRecord.type,
            regon: activityLegalRecord.regon,
            krs: activityLegalRecord.krs,
            nip: activityLegalRecord.nip,
        }
    }
}

