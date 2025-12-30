// Importa decorators e exceções do NestJS
import { Injectable, UnauthorizedException } from '@nestjs/common';

// Importa o serviço JWT
import { JwtService } from '@nestjs/jwt';

// Importa o service de usuário
import { UsuarioService } from '../usuario/services/usuario.service';

// Importa o serviço bcrypt
import { BcryptService } from './services/bcrypt.service';

// Importa a entidade Usuario
import { Usuario } from '../usuario/entities/usuario.entity';

@Injectable()
export class AuthService {

  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
    private bcryptService: BcryptService
  ) {}

  // Valida usuário e senha no login
  async validarUsuario(
    usuario: string,
    senha: string
  ): Promise<Usuario> {

    // Busca usuário no banco
    const usuarioBanco = await this.usuarioService.findByUsuario(usuario);

    // Se não existir, erro
    if (!usuarioBanco) {
      throw new UnauthorizedException('Usuário inválido');
    }

    // Compara senha digitada com a senha criptografada
    const senhaValida = await this.bcryptService.compararSenha(
      senha,
      usuarioBanco.senha
    );

    // Se a senha estiver incorreta
    if (!senhaValida) {
      throw new UnauthorizedException('Senha inválida');
    }

    // Retorna o usuário validado
    return usuarioBanco;
  }

  // Gera o token JWT
  async login(usuario: Usuario) {

    // Payload que vai dentro do token
    const payload = {
      sub: usuario.id,
      usuario: usuario.usuario,
    };

    // Retorna o token assinado
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
