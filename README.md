<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Order Management System API

An order management system (OMS) API with extensible features.

## Technologies

- Node.js
- TypeScript
- Nest.js
- PostgreSQL
- Prisma
- Swagger
- JWT Authentication

## Architecture

### [Database Diagram](https://dbdocs.io/ahmadmashaal01/Order-Management-System?view=relationships)

![Database Diagram](./arch/dbdiagram.png)

### Dependency Graph

```mermaid
flowchart LR
    AppModule["AppModule"]

    PrismaModule["PrismaModule"]
     
    AuthModule["AuthModule"]
    
    UsersModule["UsersModule"]
    
    ProductsModule["ProductsModule"]
    
    CartModule["CartModule"]
    
    OrdersModule["OrdersModule"]
    
    CartItemsModule["CartItemsModule"]
    
    OrderItemsModule["OrderItemsModule"]
    
    AppModule --> PrismaModule
    AppModule --> AuthModule
    AppModule --> UsersModule
    AppModule --> ProductsModule
    AppModule --> CartModule
    AppModule --> OrdersModule
    AppModule --> CartItemsModule
    AppModule --> OrderItemsModule

    AuthModule --> UsersModule

    UsersModule --> CartModule
    UsersModule --> OrdersModule
    UsersModule --> PrismaModule
    
    CartModule --> CartItemsModule
    CartModule --> ProductsModule
    CartModule --> PrismaModule

    OrdersModule --> CartModule
    OrdersModule --> OrderItemsModule
    OrdersModule --> PrismaModule

    CartItemsModule --> PrismaModule

    OrderItemsModule --> PrismaModule
```

## Running the app

1. **Clone the repository:**

```bash
git clone https://github.com/relin404/order-management-system.git
cd order-management-system
```

2. **Install required packages:**

```bash
pnpm install # can also use npm or yarn instead of pnpm
```

3. **Build and start the Postgres Docker container:**

*Make sure to have [Docker Compose](https://docs.docker.com/compose/install/) installed.*

```bash
docker-compose up -d
```

This command will start the Postgres container in detached mode.

4. **Generate Prisma artifacts:**

```bash
pnpm dlx prisma generate # can also use npx instead of 'pnpm dlx'
```

This command will generate Prisma artifacts required for the repositories to work properly.

5. **Run the application:**

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Testing the app

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
