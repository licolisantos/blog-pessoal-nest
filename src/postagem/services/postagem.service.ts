import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Postagem } from '../entities/postagem.entity';

@Injectable()
export class PostagemService {
  constructor(
    @InjectRepository(Postagem)
    private postagemRepository: Repository<Postagem>,
  ) {}

  findAll(): Promise<Postagem[]> {
    return this.postagemRepository.find({
      relations: { tema: true, usuario: true },
    });
  }

  async findById(id: number): Promise<Postagem> {
    const postagem = await this.postagemRepository.findOne({
      where: { id },
      relations: { tema: true, usuario: true },
    });
    if (!postagem) throw new NotFoundException('Postagem não encontrada');
    return postagem;
  }

  findByTitulo(titulo: string): Promise<Postagem[]> {
    return this.postagemRepository.find({
      where: { titulo: ILike(`%${titulo}%`) },
      relations: { tema: true, usuario: true },
    });
  }

  create(postagem: Postagem): Promise<Postagem> {
    return this.postagemRepository.save(postagem);
  }

  async update(postagem: Postagem): Promise<Postagem> {
    await this.findById(postagem.id);
    return this.postagemRepository.save(postagem);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.postagemRepository.delete(id);
  }
}
