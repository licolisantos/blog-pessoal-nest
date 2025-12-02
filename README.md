# 🌐 Blog Pessoal – API com NestJS

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

<p align="center">
  API desenvolvida com <strong>NestJS</strong>, <strong>TypeScript</strong> e <strong>MySQL</strong> como parte dos estudos do Bootcamp Full-Stack da Generation Brasil.
</p>

---

## 📘 Sobre o Projeto

Este repositório contém a API do **Blog Pessoal**, criada para treinar conceitos essenciais do desenvolvimento backend com NestJS, como:

- 🧩 Estrutura modular (Modules)  
- 🛰️ Controllers e rotas REST  
- ⚙️ Services e regra de negócio  
- 🗄️ Entidades e mapeamento com TypeORM  
- 🛢️ Integração com banco MySQL  
- 🧪 Testes e requisições via Insomnia  

Este projeto faz parte da minha evolução como Desenvolvedora Web e será aprimorado ao longo do bootcamp.

---

## 🛠️ Tecnologias Utilizadas

- 🚀 **NestJS**  
- 🟦 **Node.js**  
- 🟨 **TypeScript**  
- 🗄️ **MySQL + TypeORM**  
- 🧪 **Insomnia**  
- ✨ **ESLint & Prettier**

---

## 🚀 Como Rodar o Projeto

### 1️⃣ Instalar dependências

```bash
npm install
# desenvolvimento
npm run start

# modo watch
npm run start:dev

# produção
npm run start:prod

# testes unitários
npm run test

# testes e2e
npm run test:e2e

# cobertura
npm run test:cov
TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'db_blogpessoal',
  autoLoadEntities: true,
  synchronize: true,
});
```

##  👩‍💻 Sobre Mim

Licoli Santos  
 -- Desenvolvedora Web em formação

🚀 Aluna do Bootcamp Full-Stack JavaScript – Generation Brasil


🌐 Minhas Redes

💼 LinkedIn: www.linkedin.com/in/licoli-santos

🐙 GitHub: https://github.com/licolisantos

📧 Email: joaogabriellicoli@gmail.com