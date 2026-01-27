import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Usuario } from '../usuario/entities/usuario.entity';
import { UsuarioLogin } from './entities/usuario-login.entity';

interface RequestWithUser extends Request {
  user: Usuario;
}

@ApiTags('Auth')
@Controller('/usuarios')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/logar')
  @ApiBody({ type: UsuarioLogin })
  login(@Req() req: RequestWithUser) {
    return this.authService.login(req.user);
  }
}
