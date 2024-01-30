<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  Task-Manager a reference [Nest](https://github.com/nestjs/nest) application modified from a [Udemy](https://www.udemy.com) course

## Description

Repo set up to work though the Udemy course [NestJS Zero to Hero](https://www.udemy.com/course/nestjs-zero-to-hero). Only me being me I needed to ***tinker*** with it a bit for my sensibilities. First I decided to use [pnpm](https://pnpm.io/) as my package manager rather than npm or yarn. This was actually almost painless. But I decided that I didn't want a full blown PostgreSQL install for a simple tutorial app. Yeah with docker etc... it's not that big of a thing but still I just couldn't make myself do it so I first I considered SQLite, I'd used it in the past as bit and find it's a great database for when I'm learning something. Checking in on the state of sqlLite though I found out about [libSQL](https://github.com/tursodatabase/libsql) an open source fork of [SQLite](https://sqlite.org) and [Turso](https://turso.tech/). I liked a lot of what I reading so choose that as my database. But TypeORM doesn't support Turso yet so I switched to [Prisma](https://www.prisma.io/) instead. 

## Installation

```bash
$ pnpm install
```

# Installing Prisma

```bash
$ pnpm add prisma --save-dev
$ pnpm exec prisma init
$ pnpm exec prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > migration.sql
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov

```

## References 
- [SQLite on the Edge: Prisma Support for Turso is in Early Access](https://www.prisma.io/blog/prisma-turso-ea-support-rXGd_Tmy3UXX)
- [Prisma Docs](https://www.prisma.io/docs/)
