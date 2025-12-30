// Importa Injectable
import { Injectable } from '@nestjs/common';

// Importa PassportStrategy
import { PassportStrategy } from '@nestjs/passport';

// Importa JWT
import { ExtractJwt, Strategy } from 'passport-jwt';

// Importa constantes CORRETAS
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      usuario: payload.usuario,
    };
  }
}
