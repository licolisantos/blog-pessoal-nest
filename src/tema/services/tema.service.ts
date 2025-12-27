import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Tema } from "../entities/tema.entity";

@Injectable()
export class TemaService {

    constructor(
        @InjectRepository(Tema)
        private temaRepository: Repository<Tema>
    ) {}

    findAll(): Promise<Tema[]> {
        return this.temaRepository.find();
    }

    async findById(id: number): Promise<Tema> {
        const tema = await this.temaRepository.findOneBy({ id });

        if (!tema)
            throw new NotFoundException("Tema não encontrado");

        return tema;
    }

    findByDescricao(descricao: string): Promise<Tema[]> {
        return this.temaRepository.find({
            where: { descricao: ILike(`%${descricao}%`) }
        });
    }

    create(tema: Tema): Promise<Tema> {
        return this.temaRepository.save(tema);
    }

    async update(tema: Tema): Promise<Tema> {
        await this.findById(tema.id);
        return this.temaRepository.save(tema);
    }

    async delete(id: number): Promise<void> {
        await this.findById(id);
        await this.temaRepository.delete(id);
    }
}