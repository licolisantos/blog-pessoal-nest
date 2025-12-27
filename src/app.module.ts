// Importo o decorator Module, que transforma essa classe em um módulo do NestJS
import { Module } from '@nestjs/common';

// Importo o TypeOrmModule, responsável pela conexão com o banco de dados
import { TypeOrmModule } from '@nestjs/typeorm';

// Importo as ENTIDADES que representam as tabelas do banco
// Postagem → tabela tb_postagens
import { Postagem } from './postagem/entities/postagem.entity';

// Tema → tabela tb_temas
import { Tema } from './tema/entities/tema.entity';

// Importo os módulos de domínio da aplicação
// Cada módulo organiza um recurso (Postagem e Tema)
import { PostagemModule } from './postagem/postagem.module';
import { TemaModule } from './tema/tema.module';

// Decorator que define este arquivo como o módulo principal da aplicação
@Module({
  // O array imports define tudo que a aplicação precisa carregar
  imports: [

    // Configuração da conexão com o banco de dados MySQL
    // O forRoot é usado APENAS no AppModule
    TypeOrmModule.forRoot({
      type: 'mysql',              // Tipo do banco de dados
      host: 'localhost',           // Endereço do servidor do banco
      port: 3306,                  // Porta padrão do MySQL
      username: 'root',            // Usuário do banco
      password: 'root',            // Senha do banco
      database: 'db_blogpessoal',  // Nome do banco de dados

      // synchronize true faz o TypeORM criar/atualizar as tabelas automaticamente
      // (usado apenas em ambiente de desenvolvimento)
      synchronize: true,

      // logging true exibe no terminal as queries executadas
      logging: true,

      // Registro das entidades que o TypeORM deve gerenciar
      // Se uma entidade não estiver aqui, o TypeORM não reconhece
      entities: [Postagem, Tema],
    }),

    // Registro do módulo de Postagem
    // Permite usar controllers, services e repositórios de Postagem
    PostagemModule,

    // Registro do módulo de Tema
    // Permite usar controllers, services e repositórios de Tema
    TemaModule,
  ],
})

// Classe principal do módulo da aplicação
export class AppModule {}
