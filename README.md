
## Description
Budget-Buddy 是一個提供記帳服務的網頁應用程式，後端使用 NestJs 框架，搭配 MongoDB 實作。

## Env
```
  PORT=3000
  DB_SERVER=localhost
  DB_PORT=27017
  DB_USER=root
  DB_PASSWORD=example
  DB_NAME=bugetbuddy
  DB_URL='mongo connection url'
  VERIFICATION='verification string'
```

## Swagger
  http://localhost:3000/api

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

