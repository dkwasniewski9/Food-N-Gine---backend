import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {AddressService} from "./address.service";
import {AddressRequestDto} from "./dto/address.request.dto";
import {AddressResponseDto} from "./dto/address.response.dto";

@Controller('addresses')
@UseGuards(AuthGuard("jwt"))
export class AddressController {
    constructor(private readonly addressService: AddressService) {

    }

    @Post()
    @HttpCode(201)
    async create(@Body() dto: AddressRequestDto): Promise<AddressResponseDto> {
        return this.addressService.create(dto);
    }


    @Get()
    async all(): Promise<AddressResponseDto[]> {
        return await this.addressService.all();
    }

    @Get(":id")
    async one(@Param("id") id: number): Promise<AddressResponseDto> {
        return await this.addressService.one(id);
    }

    @Put(":id")
    async update(@Param("id") id: number, @Body() dto: AddressRequestDto)
        : Promise<AddressResponseDto> {
        return await this.addressService.update(id, dto);
    }

    @Delete(":id")
    @HttpCode(204)
    async delete(@Param("id") id: number): Promise<void> {
        await this.addressService.delete(id);
    }
}
