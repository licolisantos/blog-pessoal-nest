// Importa o Injectable para permitir injeção de dependência
import { Injectable, UnauthorizedException } from '@nestjs/common';

// Importa a estratégia base do Passport
import { PassportStrategy } from '@nestjs/passport';

// Importa a estratégia Local do passport-local
import { Strategy } from 'passport-local';

// Importa o AuthService
import { AuthService } from './auth.service';

// Importa a entidade Usuario
import { Usuario } from '../usuario/entities/usuario.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private authService: AuthService) {

    // AQUI ESTÁ A CORREÇÃO CRÍTICA
    // Dizemos explicitamente quais campos virão do body
    super({
      usernameField: 'usuario',
      passwordField: 'senha',
    });
  }

  // Método chamado automaticamente pelo Passport
  async validate(usuario: string, senha: string): Promise<Usuario> {

    const usuarioValidado = await this.authService.validarUsuario(usuario, senha);

    if (!usuarioValidado) {
      throw new UnauthorizedException();
    }

    return usuarioValidado;
  }
}
