// Importa Injectable
import { Injectable } from '@nestjs/common';

// Importa InjectRepository
import { InjectRepository } from '@nestjs/typeorm';

// Importa Repository
import { Repository } from 'typeorm';

// Importa entidade Usuario
import { Usuario } from '../entities/usuario.entity';

// Importa BcryptService
import { BcryptService } from '../../auth/services/bcrypt.service';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,

    // Injeta o serviço de criptografia
    private bcryptService: BcryptService,
  ) {}

  // Retorna todos os usuários
  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  // Busca por id
  findById(id: number): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { id } });
  }

  // Busca pelo campo usuario (login)
  findByUsuario(usuario: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { usuario } });
  }

  // Cria usuário COM senha criptografada
  async create(usuario: Usuario): Promise<Usuario> {

    // Criptografa a senha antes de salvar
    usuario.senha = await this.bcryptService.criptografarSenha(
      usuario.senha,
    );

    return this.usuarioRepository.save(usuario);
  }

  // Atualiza usuário
  async update(usuario: Usuario): Promise<Usuario> {

    usuario.senha = await this.bcryptService.criptografarSenha(
      usuario.senha,
    );

    return this.usuarioRepository.save(usuario);
  }
}
