// Importo o decorator Module, que transforma esta classe
// em um módulo do NestJS
import { Module } from "@nestjs/common";

// Importo o TypeOrmModule para permitir a integração
// deste módulo com o banco de dados via TypeORM
import { TypeOrmModule } from "@nestjs/typeorm";

// Importo a entidade Postagem, que representa a tabela tb_postagens
import { Postagem } from "./entities/postagem.entity";

// Importo o service responsável pela lógica de negócio
// relacionada às postagens
import { PostagemService } from "./services/postagem.service";

// Importo o controller responsável por expor os endpoints
// da API para o recurso Postagem
import { PostagemController } from "./controller/postagem.controller";

// O decorator @Module define que esta classe é um módulo do NestJS
@Module({
  // No array imports, utilizo o TypeOrmModule.forFeature
  // para registrar a entidade Postagem neste módulo
  // Isso permite o uso do repositório da entidade Postagem
  imports: [TypeOrmModule.forFeature([Postagem])],

  // Registro do controller responsável pelas rotas de Postagem
  controllers: [PostagemController],

  // Registro do service que contém as regras de negócio de Postagem
  providers: [PostagemService],

  // Exporto o TypeOrmModule para
  // permitir que outros módulos possam usar o repositório de Postagem
  exports: [TypeOrmModule],
})
export class PostagemModule {}