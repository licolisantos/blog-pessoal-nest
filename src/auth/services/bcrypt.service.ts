// Importa o Injectable para permitir injeção de dependência
import { Injectable } from '@nestjs/common';

// Importa a biblioteca bcrypt
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BcryptService {
  // Criptografa a senha antes de salvar no banco
  async criptografarSenha(senha: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(senha, salt);
  }

  // Compara a senha digitada com a senha criptografada no banco
  async compararSenha(
    senhaDigitada: string,
    senhaBanco: string,
  ): Promise<boolean> {
    return bcrypt.compare(senhaDigitada, senhaBanco);
  }
}
