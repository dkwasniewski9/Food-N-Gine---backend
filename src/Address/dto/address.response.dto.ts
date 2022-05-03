import {Address} from "../address.entity";


export class AddressResponseDto {
    id: number;
    street: string;
    city: string;
    house: string;
    door: number;
    postCode: string;

    static async of(address: Address): Promise<AddressResponseDto> {
        return {
            id: address.id,
            street: address.streetName,
            city: address.city,
            house: address.houseNumber,
            door: address.doorNumber,
            postCode: address.postCode,
        }
    }
}

