import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../src/app.module';

describe('Recurso Usuário - Testes E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: ['dist/**/*.entity.js'],
          synchronize: true,
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
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
    // Primeiro faz login para obter token
    const loginResponse = await request(app.getHttpServer())
      .post('/usuarios/logar')
      .send({
        usuario: 'licoli@email.com',
        senha: '12345678',
      });

    const token = (loginResponse.body as { token: string }).token;

    const response = await request(app.getHttpServer())
      .get('/usuarios/all')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('05 - Deve Atualizar um Usuário', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/usuarios/logar')
      .send({
        usuario: 'licoli@email.com',
        senha: '12345678',
      });

    const token = (loginResponse.body as { token: string }).token;

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
  });

  afterAll(async () => {
    await app.close();
  });
});
