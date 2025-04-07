# 📦 E-commerce de Locação - MVP

Este é um MVP de um sistema de e-commerce voltado para **locação de produtos**

O repositório está dividido em duas pastas principais:

- `locadora-backend/`: API REST construída com Node.js, Express, Knex.js e SQLite.
- `locadora-frontend/`: Interface web criada com React + Vite.

## 🚀 Como Rodar o Projeto Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/ecommerce-locacao.git
cd ecommerce-locacao
```

### 2. Instale e rode o backend

```bash
cd locadora-backend
npm install
npx knex migrate:latest
npx knex seed:run
npm run dev
```

A API será iniciada em `http://localhost:3000`

### 3. Instale e rode o frontend

```bash
cd ../locadora-frontend
npm install
npm run dev
```

A aplicação frontend estará em `http://localhost:5173`

## 🔐 Login de Teste

Use o seguinte usuário para autenticar:

- **Email:** `fredx@sisloc.com.br`
- **Senha:** `123Fred`

## ⚙️ Funcionalidades Implementadas

- Login com autenticação JWT
- Listagem de produtos com campo de busca
- Visualização de detalhes de produto
- Seleção de tipo de locação e quantidade
- Adição de itens ao carrinho
- Visualização e edição do carrinho
- Finalização de pedido com cálculo de total

## 🛠 Tecnologias Utilizadas

**Backend:**
- Node.js
- Express
- SQLite
- Knex.js
- Bcrypt
- JWT

**Frontend:**
- React
- Vite
- Axios

## 📎 Observações

- O projeto está preparado para rodar inteiramente em ambiente local.
- O banco de dados é populado automaticamente com alguns produtos via seeds.
