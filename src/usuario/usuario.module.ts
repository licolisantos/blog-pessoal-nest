// Importa Module e forwardRef
import { Module, forwardRef } from '@nestjs/common';

// Importa TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';

// Importa entidade Usuario
import { Usuario } from './entities/usuario.entity';

// Importa service e controller
import { UsuarioService } from './services/usuario.service';
import { UsuarioController } from './controller/usuario.controller';

// Importa AuthModule COM forwardRef
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),

    // Resolve a dependência circular
    forwardRef(() => AuthModule),
  ],

  controllers: [
    UsuarioController,
  ],

  providers: [
    UsuarioService,
  ],

  exports: [
    UsuarioService,
    TypeOrmModule,
  ],
})
export class UsuarioModule {}
