import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { BcryptService } from '../../auth/services/bcrypt.service';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private bcryptService: BcryptService,
  ) {}

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');
    return usuario;
  }

  findByUsuario(usuario: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { usuario } });
  }

  async create(usuario: Usuario): Promise<Usuario> {
    usuario.senha = await this.bcryptService.criptografarSenha(usuario.senha);
    return this.usuarioRepository.save(usuario);
  }

  async update(usuario: Usuario): Promise<Usuario> {
    await this.findById(usuario.id);
    usuario.senha = await this.bcryptService.criptografarSenha(usuario.senha);
    return this.usuarioRepository.save(usuario);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.usuarioRepository.delete(id);
  }
}
