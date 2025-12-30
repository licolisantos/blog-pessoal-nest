// Importa os decorators necessários do NestJS
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

// Importa a entidade Usuario
import { Usuario } from '../entities/usuario.entity';

// Importa o service responsável pelas regras de negócio
import { UsuarioService } from '../services/usuario.service';

// Importa o Guard de autenticação JWT
// Ele verifica se o token enviado no header é válido
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

// Define o controller do recurso Usuario
// Todas as rotas começam com /usuarios
@Controller('/usuarios')
export class UsuarioController {

  // Injeta o UsuarioService
  constructor(
    private readonly usuarioService: UsuarioService
  ) {}

  // ================================
  // 🔒 ROTAS PROTEGIDAS (COM JWT)
  // ================================

  // Lista todos os usuários
  // Só funciona se o token JWT for enviado no header
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  // Busca um usuário pelo ID
  // Também exige autenticação JWT
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  findById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Usuario | null> {
    return this.usuarioService.findById(id);
  }

  // Atualiza um usuário
  // Exige JWT porque altera dados sensíveis
  @UseGuards(JwtAuthGuard)
  @Put()
  update(
    @Body() usuario: Usuario
  ): Promise<Usuario> {
    return this.usuarioService.update(usuario);
  }

  // ================================
  // 🔓 ROTA PÚBLICA (SEM JWT)
  // ================================

  // Cria um novo usuário
  // NÃO usa JwtAuthGuard
  // Motivo: qualquer pessoa precisa conseguir se cadastrar
  @Post()
  create(
    @Body() usuario: Usuario
  ): Promise<Usuario> {
    return this.usuarioService.create(usuario);
  }
}
