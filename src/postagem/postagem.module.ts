// Importa o decorator Module do NestJS
import { Module } from '@nestjs/common';

// Importa o módulo do TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';

// Importa a entidade Postagem
import { Postagem } from './entities/postagem.entity';

// Importa o controller de Postagem
import { PostagemController } from './controller/postagem.controller';

// Importa o service de Postagem
import { PostagemService } from './services/postagem.service';

// Importa os módulos relacionados
import { TemaModule } from '../tema/tema.module';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  // Registra a entidade Postagem
  imports: [
    TypeOrmModule.forFeature([Postagem]),

    // Importa os módulos que possuem entidades relacionadas
    TemaModule,
    UsuarioModule,
  ],

  // Registra o controller
  controllers: [PostagemController],

  // Registra o service
  providers: [PostagemService],
})
export class PostagemModule {}
