// Importa o decorator Module
import { Module } from '@nestjs/common';

// Importa o TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';

// Importa os módulos da aplicação
import { PostagemModule } from './postagem/postagem.module';
import { TemaModule } from './tema/tema.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [

    // Configuração do banco de dados
    TypeOrmModule.forRoot({
      type: 'mysql',               // OBRIGATÓRIO → era isso que estava undefined
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_blogpessoal',
      autoLoadEntities: true,
      synchronize: true,
    }),

    // Importação dos módulos
    PostagemModule,
    TemaModule,
    UsuarioModule,
    AuthModule,
  ],
})
export class AppModule {}
