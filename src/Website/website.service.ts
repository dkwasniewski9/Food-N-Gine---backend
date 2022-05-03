import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AbstractService } from "../Shared/abstract.service";
import { Repository } from "typeorm";
import { Website } from "./website.entity";
import { WebsiteRequestDto } from "./dto/website.request.dto";
import { WebsiteResponseDto } from "./dto/website.response.dto";


@Injectable()
export class WebsiteService{

    constructor(
        @InjectRepository(Website)
        private readonly websiteRepository: Repository<Website>
    ) {
    }


    async all(): Promise<WebsiteResponseDto[]> {
        const entities: Website[] = await this.websiteRepository.find();
        return Promise.all(entities.map(e => WebsiteResponseDto.of(e)));
    }

    async one(id: number): Promise<WebsiteResponseDto> {
        const entity = await this.websiteRepository.findOne(id);
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        return WebsiteResponseDto.of(entity);
    }

    async create(dto: WebsiteRequestDto): Promise<WebsiteResponseDto> {
        const entity: Website = await this.websiteRepository.save(this.websiteRepository.create(dto));
        return WebsiteResponseDto.of(entity);
    }

    async update(id: number, dto: WebsiteRequestDto): Promise<WebsiteResponseDto> {
        let entity = await this.websiteRepository.findOne(id);
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        Object.assign(entity, dto);
        return WebsiteResponseDto.of(await this.websiteRepository.save(entity));
    }

    async delete(id: number): Promise<void> {
        const entity = await this.websiteRepository.findOne(id);
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        await this.websiteRepository.remove(entity);
    }
}
