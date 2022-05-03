import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Address} from "./address.entity";
import {AddressRequestDto} from "./dto/address.request.dto";
import {AddressResponseDto} from "./dto/address.response.dto";

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>
    ) {
    }


    async all(): Promise<AddressResponseDto[]> {
        const entities: Address[] = await this.addressRepository.find();
        return Promise.all(entities.map(e => AddressResponseDto.of(e)));
    }

    async one(id: number): Promise<AddressResponseDto> {
        const entity = await this.addressRepository.findOne(id);
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        return AddressResponseDto.of(entity);
    }

    async create(dto: AddressRequestDto): Promise<AddressResponseDto> {
        const entity: Address = await this.addressRepository.save(this.addressRepository.create(dto));
        return AddressResponseDto.of(entity);
    }

    async update(id: number, dto: AddressRequestDto): Promise<AddressResponseDto> {
        let entity = await this.addressRepository.findOne(id);
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        Object.assign(entity, dto);
        return AddressResponseDto.of(await this.addressRepository.save(entity));
    }

    async delete(id: number): Promise<void> {
        const entity = await this.addressRepository.findOne(id);
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        await this.addressRepository.remove(entity);
    }
}
