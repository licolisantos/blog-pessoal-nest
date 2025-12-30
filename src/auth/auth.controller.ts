// Importa decorators do NestJS
import { Controller, Post, Req, UseGuards } from '@nestjs/common';

// Importa o AuthService
import { AuthService } from './auth.service';

// Importa o LocalAuthGuard
import { LocalAuthGuard } from './local-auth.guard';

@Controller('/auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  // Endpoint de login
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req) {

    // req.user vem da LocalStrategy
    return this.authService.login(req.user);
  }
}
