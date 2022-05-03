import { HttpException, HttpStatus } from "@nestjs/common";
import { Repository } from "typeorm";

export abstract class AbstractService<TEntity, TRequestDto, TResponseDto> {
    constructor (
        protected repository: Repository<TEntity>,
        protected of: (entity: TEntity) => Promise<TResponseDto>) {
    }

    async all(): Promise<TResponseDto[]> {
        const entities: TEntity[] = await this.repository.find();
        return Promise.all(entities.map(e => this.of(e)));
    }

    async one(id: number): Promise<TResponseDto> {
        const entity = await this.repository.findOne(id);
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        return this.of(entity);
    }

    async create(dto: TRequestDto): Promise<TResponseDto> {
        const entity: TEntity = await this.repository.save(this.repository.create(dto));
        return this.of(entity);
    }

    async update(id: number, dto: TRequestDto): Promise<TResponseDto> {
        let entity = await this.repository.findOne(id);
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        Object.assign(entity, dto);
        return this.of(await this.repository.save(entity));
    }

    async delete(id: number) : Promise<void> {
        const entity = await this.repository.findOne(id);
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        this.repository.remove(entity);
    }
}
