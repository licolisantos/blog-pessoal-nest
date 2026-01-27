// Importa o decorator Module
import { Module, forwardRef } from '@nestjs/common';

// Importa Passport e JWT
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

// Importa o módulo de usuário COM forwardRef
import { UsuarioModule } from '../usuario/usuario.module';

// Importa controllers e services
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

// Importa strategy e guard
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

// Importa o serviço de criptografia
import { BcryptService } from './services/bcrypt.service';

// Importa constantes do JWT
import { jwtConstants } from './constants';

@Module({
  imports: [
    // forwardRef resolve a dependência circular
    forwardRef(() => UsuarioModule),

    PassportModule,

    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],

  controllers: [AuthController],

  providers: [AuthService, LocalStrategy, JwtStrategy, BcryptService],

  // Exporta o BcryptService para o UsuarioModule
  exports: [BcryptService],
})
export class AuthModule {}
