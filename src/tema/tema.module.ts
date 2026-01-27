// Importo o decorator Module, que transforma esta classe
// em um módulo do NestJS
import { Module } from '@nestjs/common';

// Importo o TypeOrmModule para permitir a integração
// deste módulo com o banco de dados via TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';

// Importo a entidade Tema, que representa a tabela tb_temas
import { Tema } from './entities/tema.entity';

// Importo o service responsável pela lógica de negócio
// relacionada aos temas
import { TemaService } from './services/tema.service';

// Importo o controller responsável por expor os endpoints
// da API para o recurso Tema
import { TemaController } from './controller/tema.controller';

// O decorator @Module define que esta classe é um módulo do NestJS
@Module({
  // No array imports, utilizo o TypeOrmModule.forFeature
  // para registrar a entidade Tema neste módulo
  // Isso permite o uso do repositório da entidade Tema
  imports: [TypeOrmModule.forFeature([Tema])],

  // Registro do controller responsável pelas rotas de Tema
  controllers: [TemaController],

  // Registro do service que contém as regras de negócio de Tema
  providers: [TemaService],

  // Exporto o TypeOrmModule para que outros módulos possam
  // reutilizar o repositório da entidade Tema, se necessário
  exports: [TypeOrmModule],
})

// Classe que representa o módulo de Tema
export class TemaModule {}
