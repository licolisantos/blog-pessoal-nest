// Importa utilitários de teste do NestJS
import { Test, TestingModule } from '@nestjs/testing';

// Interface da aplicação Nest
import { INestApplication } from '@nestjs/common';

// Supertest permite simular requisições HTTP
import * as request from 'supertest';

// Módulo de configuração do TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';

// Módulo principal da aplicação
import { AppModule } from '../src/app.module';

describe('Recurso Usuário - Testes E2E', () => {

  // Variável que representa a aplicação Nest em execução
  let app: INestApplication;

  /**
   * beforeAll executa UMA VEZ antes de todos os testes
   * Aqui configuramos:
   * - Banco SQLite em memória
   * - AppModule
   */
  beforeAll(async () => {

    const moduleFixture: TestingModule =
      await Test.createTestingModule({
        imports: [

          // Configuração do banco de dados de TESTE
          TypeOrmModule.forRoot({
            type: 'sqlite',
            database: ':memory:',        // Banco em memória
            dropSchema: true,            // Apaga schema a cada execução
            entities: ['dist/**/*.entity.js'],
            synchronize: true,           // Cria as tabelas automaticamente
          }),

          // Importa toda a aplicação
          AppModule,
        ],
      }).compile();

    // Cria a aplicação Nest
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  /**
   * TESTE 01
   * Deve cadastrar um novo usuário
   */
  it('01 - Deve Cadastrar Usuário', async () => {
    return request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Licoli Santos',
        usuario: 'licoli@email.com',
        senha: '12345678',
        foto: 'foto.png',
      })
      .expect(201);
  });

  /**
   * TESTE 02
   * Deve autenticar o usuário (login)
   */
  it('02 - Deve Autenticar Usuário', async () => {
    return request(app.getHttpServer())
      .post('/usuarios/logar')
      .send({
        usuario: 'licoli@email.com',
        senha: '12345678',
      })
      .expect(200);
  });

  /**
   * TESTE 03
   * Não deve permitir cadastro de usuário duplicado
   */
  it('03 - Não Deve Cadastrar Usuário Duplicado', async () => {
    return request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Licoli Santos',
        usuario: 'licoli@email.com',
        senha: '12345678',
        foto: 'foto.png',
      })
      .expect(400);
  });

  /**
   * TESTE 04
   * Deve listar todos os usuários cadastrados
   */
  it('04 - Deve Listar todos os Usuários', async () => {
    return request(app.getHttpServer())
      .get('/usuarios/all')
      .expect(200);
  });

  /**
   * TESTE 05
   * Deve atualizar os dados de um usuário
   */
  it('05 - Deve Atualizar um Usuário', async () => {
    return request(app.getHttpServer())
      .put('/usuarios/atualizar')
      .send({
        id: 1,
        nome: 'Licoli Santos Atualizado',
        usuario: 'licoli@email.com',
        senha: '12345678',
        foto: 'foto-atualizada.png',
      })
      .expect(200);
  });

  /**
   * afterAll encerra a aplicação após os testes
   */
  afterAll(async () => {
    await app.close();
  });
});
