// Importa decorators e utilitários do NestJS para criar controllers e rotas
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

// Importa a entidade Postagem
// Representa o modelo de dados que será recebido e retornado pela API
import { Postagem } from '../entities/postagem.entity';

// Importa o service responsável pela regra de negócio da Postagem
import { PostagemService } from '../services/postagem.service';

// Importa o Guard de autenticação JWT
// Esse Guard protege as rotas e exige um token válido
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

// Define a rota base do controller como /postagens
// Todas as rotas deste controller começam com /postagens
@Controller('/postagens')

// Aplica o JwtAuthGuard em TODAS as rotas do controller
// Qualquer requisição só será aceita se possuir um token JWT válido
@UseGuards(JwtAuthGuard)
export class PostagemController {

  // Injeta o PostagemService no controller
  // O controller apenas recebe a requisição e delega a lógica ao service
  constructor(
    private readonly postagemService: PostagemService
  ) {}

  // GET /postagens
  // Retorna todas as postagens cadastradas no sistema
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Postagem[]> {
    return this.postagemService.findAll();
  }

  // GET /postagens/:id
  // Retorna uma postagem específica pelo id
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(
    // O ParseIntPipe garante que o id recebido seja convertido para number
    @Param('id', ParseIntPipe) id: number
  ): Promise<Postagem | null> {
    return this.postagemService.findById(id);
  }

  // GET /postagens/titulo/:titulo
  // Retorna todas as postagens cujo título contenha o texto informado
  @Get('/titulo/:titulo')
  @HttpCode(HttpStatus.OK)
  findByTitulo(
    @Param('titulo') titulo: string
  ): Promise<Postagem[]> {
    return this.postagemService.findByTitulo(titulo);
  }

  // POST /postagens
  // Cria uma nova postagem no banco de dados
  // O corpo da requisição deve conter os dados da postagem,
  // incluindo o relacionamento com Tema e Usuario
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() postagem: Postagem
  ): Promise<Postagem> {
    return this.postagemService.create(postagem);
  }

  // PUT /postagens
  // Atualiza uma postagem existente
  // O objeto deve conter o id da postagem a ser atualizada
  @Put()
  @HttpCode(HttpStatus.OK)
  update(
    @Body() postagem: Postagem
  ): Promise<Postagem> {
    return this.postagemService.update(postagem);
  }

  // DELETE /postagens/:id
  // Remove uma postagem do banco de dados pelo id
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @Param('id', ParseIntPipe) id: number
  ): Promise<void> {
    return this.postagemService.delete(id);
  }
}
