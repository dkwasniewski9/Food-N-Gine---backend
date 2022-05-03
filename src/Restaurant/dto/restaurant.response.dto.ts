import {Restaurant} from "../restaurant.entity";
import {WebsiteResponseDto} from "../../Website/dto/website.response.dto";
import {AddressResponseDto} from "../../Address/dto/address.response.dto";
import {UserResponseDto} from "../../User/dto/user.response.dto";
import {ActivityLegalRecordResponseDto} from "../../ActivityLegalRecord/dto/activity.legal.record.response.dto";

export class RestaurantResponseDto {
    id: number;
    name: string;
    phoneNumber: string;
    logo: string;
    mondayOpenHour: Date;
    mondayCloseHour: Date;
    tuesdayOpenHour: Date;
    tuesdayCloseHour: Date;
    wednesdayOpenHour: Date;
    wednesdayCloseHour: Date;
    thursdayOpenHour: Date;
    thursdayCloseHour: Date;
    fridayOpenHour: Date;
    fridayCloseHour: Date;
    saturdayOpenHour: Date;
    saturdayCloseHour: Date;
    sundayOpenHour: Date;
    sundayCloseHour: Date;
    website: WebsiteResponseDto;
    address: AddressResponseDto;
    owner: UserResponseDto;
    activityLegalRecord: ActivityLegalRecordResponseDto;

    static async of(restaurant: Restaurant): Promise<RestaurantResponseDto> {
        return {
            id: restaurant.id,
            name: restaurant.name,
            phoneNumber: restaurant.phoneNumber,
            logo: restaurant.logo,
            mondayOpenHour: restaurant.mondayOpenHour,
            mondayCloseHour: restaurant.mondayCloseHour,
            tuesdayOpenHour: restaurant.thursdayOpenHour,
            tuesdayCloseHour: restaurant.tuesdayCloseHour,
            wednesdayOpenHour: restaurant.wednesdayOpenHour,
            wednesdayCloseHour: restaurant.wednesdayCloseHour,
            thursdayOpenHour: restaurant.thursdayOpenHour,
            thursdayCloseHour: restaurant.thursdayCloseHour,
            fridayOpenHour: restaurant.fridayOpenHour,
            fridayCloseHour: restaurant.fridayCloseHour,
            saturdayOpenHour: restaurant.saturdayOpenHour,
            saturdayCloseHour: restaurant.saturdayCloseHour,
            sundayOpenHour: restaurant.sundayOpenHour,
            sundayCloseHour: restaurant.sundayCloseHour,
            website: await WebsiteResponseDto.of(await restaurant.website),
            address: await AddressResponseDto.of(await restaurant.address),
            owner: await UserResponseDto.of(await restaurant.owner),
            activityLegalRecord: await ActivityLegalRecordResponseDto.of(await restaurant.activityLegalRecord)
        }
    }
}

