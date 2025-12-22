import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";

@Injectable()
export class PostagemService {

    // Aqui o Nest injeta o repositório do TypeORM
    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>
    ) {}

    //  Buscar TODAS as postagens
    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find();
    }

    //  Buscar postagem pelo ID
    async findById(id: number): Promise<Postagem> {

        const postagem = await this.postagemRepository.findOne({
            where: { id }
        });

        // Se não encontrar, lança erro
        if (!postagem) {
            throw new NotFoundException("Postagem não encontrada!");
        }

        return postagem;
    }

    //  Buscar postagem pelo título (parecido com)
    async findByTitulo(titulo: string): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            }
        });
    }

    // Criar nova postagem
    async create(postagem: Postagem): Promise<Postagem> {
        return await this.postagemRepository.save(postagem);
    }

    //  Atualizar postagem
    async update(postagem: Postagem): Promise<Postagem> {

        // Primeiro verifica se existe
        await this.findById(postagem.id);

        return await this.postagemRepository.save(postagem);
    }

    //  Deletar postagem
    async delete(id: number): Promise<void> {

        // Verifica se existe antes de apagar
        await this.findById(id);

        await this.postagemRepository.delete(id);
    }
}