// Importa o decorator Injectable do NestJS
import { Injectable } from "@nestjs/common";

// Importa o decorator para injeção do repositório
import { InjectRepository } from "@nestjs/typeorm";

// Importa classes do TypeORM
import { Repository, ILike } from "typeorm";

// Importa a entidade Postagem
import { Postagem } from "../entities/postagem.entity";

@Injectable()
export class PostagemService {

    // Injeta o repositório da entidade Postagem
    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>
    ) {}

    // Retorna todas as postagens com Tema e Usuario
    findAll(): Promise<Postagem[]> {
        return this.postagemRepository.find({
            relations: {
                tema: true,
                usuario: true
            }
        });
    }

    // Retorna uma postagem pelo id
    // Pode retornar null caso não exista
    findById(id: number): Promise<Postagem | null> {
        return this.postagemRepository.findOne({
            where: { id },
            relations: {
                tema: true,
                usuario: true
            }
        });
    }

    // Retorna todas as postagens cujo título contenha o texto informado
    findByTitulo(titulo: string): Promise<Postagem[]> {
        return this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            },
            relations: {
                tema: true,
                usuario: true
            }
        });
    }

    // Cria uma nova postagem
    create(postagem: Postagem): Promise<Postagem> {
        return this.postagemRepository.save(postagem);
    }

    // Atualiza uma postagem existente
    update(postagem: Postagem): Promise<Postagem> {
        return this.postagemRepository.save(postagem);
    }

    // Remove uma postagem pelo id
    async delete(id: number): Promise<void> {
        await this.postagemRepository.delete(id);
    }
}
