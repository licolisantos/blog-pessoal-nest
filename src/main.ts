// Importa o ValidationPipe, usado para validar automaticamente
// os dados de entrada (DTOs) com class-validator
import { ValidationPipe } from '@nestjs/common';

// Importa o NestFactory, responsável por criar a aplicação NestJS
import { NestFactory } from '@nestjs/core';

// Importa classes necessárias para configuração do Swagger
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// Importa o módulo principal da aplicação
import { AppModule } from './app.module';

// Função principal que inicializa a aplicação
async function bootstrap() {

  // Cria a instância da aplicação NestJS usando o AppModule
  const app = await NestFactory.create(AppModule);

  // Define o fuso horário da aplicação como UTC-3 (Brasil)
  // Essa configuração afeta datas e horários manipulados pelo Node.js
  process.env.TZ = '-03:00';

  // Aplica validação global em todas as rotas da aplicação
  // Garante que os dados recebidos sigam as regras definidas nos DTOs
  app.useGlobalPipes(new ValidationPipe());

  // Habilita o CORS (Cross-Origin Resource Sharing)
  // Permite que o frontend consuma a API mesmo estando em outro domínio
  app.enableCors();

  // Configuração do Swagger para documentação da API

  // Cria as configurações básicas da documentação
  const config = new DocumentBuilder()
    .setTitle('Blog Pessoal') // Título exibido no Swagger
    .setDescription('API do Blog Pessoal') // Descrição da API
    .setVersion('1.0') // Versão da API
    .addBearerAuth() // Habilita autenticação via Bearer Token (JWT)
    .build();

  // Gera o documento Swagger com base nas rotas e configurações da aplicação
  const document = SwaggerModule.createDocument(app, config);

  // Disponibiliza a interface do Swagger no endpoint /swagger
  SwaggerModule.setup('swagger', app, document);

  // Define a porta da aplicação
  // Em produção (Render, Heroku, etc), usa a porta definida pelo ambiente
  // Em desenvolvimento local, usa a porta 3000 como padrão
  const port = process.env.PORT || 3000;

  // Inicia o servidor HTTP na porta definida
  await app.listen(port);
}

// Executa a função bootstrap para iniciar a aplicação
void bootstrap();
