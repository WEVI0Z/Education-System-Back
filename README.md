## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Running and Installation

```bash
$ docker-compose up -d
```

### Docker-compose file builds installs npm and builds project, installs and builds Postgress database

## Database info

```bash
  type: "postgres",
  host: "localhost",
  port: 5433,
  username: "postgres",
  password: "pass123",
  database: "postgres",
```

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
