import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../src/usuario/entities/usuario.entity';
import { Postagem } from '../src/postagem/entities/postagem.entity';
import { Tema } from '../src/tema/entities/tema.entity';
import { UsuarioModule } from '../src/usuario/usuario.module';
import { AuthModule } from '../src/auth/auth.module';

describe('Recurso Usuário - Testes E2E', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [Usuario, Postagem, Tema],
          synchronize: true,
        }),
        UsuarioModule,
        AuthModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('01 - Deve Cadastrar Usuário', async () => {
    const response = await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Licoli Santos',
        usuario: 'licoli@email.com',
        senha: '12345678',
        foto: 'foto.png',
      });
    expect(response.status).toBe(201);
  });

  it('02 - Deve Autenticar Usuário', async () => {
    const response = await request(app.getHttpServer())
      .post('/usuarios/logar')
      .send({
        usuario: 'licoli@email.com',
        senha: '12345678',
      });
    expect(response.status).toBe(201);
    token = (response.body as { token: string }).token;
  });

  it('03 - Não Deve Cadastrar Usuário Duplicado', async () => {
    const response = await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Licoli Santos',
        usuario: 'licoli@email.com',
        senha: '12345678',
        foto: 'foto.png',
      });
    expect(response.status).toBe(500);
  });

  it('04 - Deve Listar todos os Usuários', async () => {
    const response = await request(app.getHttpServer())
      .get('/usuarios/all')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('05 - Deve Atualizar um Usuário', async () => {
    const response = await request(app.getHttpServer())
      .put('/usuarios/atualizar')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: 1,
        nome: 'Licoli Santos Atualizado',
        usuario: 'licoli@email.com',
        senha: '12345678',
        foto: 'foto-atualizada.png',
      });
    expect(response.status).toBe(200);
    expect((response.body as { nome: string }).nome).toBe(
      'Licoli Santos Atualizado',
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
