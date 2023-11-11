# NestJs Clean Architecture Template

This repository serves as a codebase for individuals looking to create an API using NestJS while adhering to the principles of Clean Architecture.

## Introduction

The template is structured following Clean Architecture principles to ease development, maintainability, and testability. It is designed to be flexible and extensible while
providing a solid foundation for NestJS API development.

## Prerequisites

Ensure you have Node.js and npm installed on your machine.

## Project Structure

The project follows a module-oriented structure in line with Clean Architecture concepts. Here's an overview of the structure:

```
src
├── application
│   ├── interface
│   │   ├── repositories
│   │   │   ├── userRepository.interface.ts
│   │   │   └── userSessionRepository.interface.ts
│   │   └── services
│   │       ├── exception.interface.ts
│   │       ├── jwtService.interface.ts
│   │       └── passwordHasher.interface.ts
│   └── usecases
│       └── connection
│           ├── create-user
│           │   ├── create-user-request.dto.ts
│           │   ├── create-user-response.dto.ts
│           │   └── create-user.ts
│           ├── login
│           │   ├── login-request.dto.ts
│           │   ├── login-response.dto.ts
│           │   └── login.ts
│           └── logout
│               ├── logout-request.dto.ts
│               └── logout.ts
├── domain
│   └── entities
│       ├── Exception.ts
│       ├── UserSession.ts
│       └── User.ts
├── infrastructure
│   ├── config
│   │   └── TypeORM.config.ts
│   ├── ORM
│   │   ├── entities
│   │   │   ├── UserORMEntity.ts
│   │   │   └── UserSessionORMEntity.ts
│   │   └── migration
│   │       ├── 1699614182228-CreateUser.ts
│   │       └── 1699630053179-CreateUserSession.ts
│   ├── repositories
│   │   ├── TypeORMUserRepository.ts
│   │   └── TypeORMUserSessionRepository.ts
│   └── services
│       ├── exception.ts
│       ├── jwtService.ts
│       └── passwordHaser.ts
├── main.ts
└── presentation
    ├── app.module.ts
    ├── controller
    │   └── connection
    │       ├── create-user
    │       │   └── create-user.controller.ts
    │       ├── login
    │       │   └── login.controller.ts
    │       └── logout
    │           └── logout.controller.ts
    └── exception
        └── exceptionFilter.ts
```

## Installation

1. To get started, clone the repository and navigate to the project directory:

```bash
git clone git@github.com:Carpetic/NestJs-Clean-Architecture-Template.git

cd NestJs-Clean-Architecture-Template
```

**Install Project Dependencies 💻**

2. Install dependencies using the command

```bash
npm install
```

**Setup Environnement and Database 📝**

3. Create a `.env` file based on the provided `.env.example`. Replace placeholder values with your personal information.
4. Configure your database type in the file `src/infrastructure/config/TypeORM.config.ts`.
5. Run migrations with the command `npm run migration:run`.

## Start the project

**Launch Project 🚀**

To launch the project, run the following commands:

```bash
npm run start
```

**Build Project 🛠️**

To build the project for production, run:

```bash
npm run build
```

**Run in Development Mode 🔄**

To run the project in development mode with hot reload, use:

```bash
npm run start:dev
```

Once the project is start, you can access the API at `http://localhost:3000`.

Don't forget to replace `3000` by the value of PORT in your `.env` file

## Migration

```bash
# Run the migration to update your database
$ npm run migration:run

# Generate migration from the file in infrastructure/ORM/entities
$ npm run migration:generate --name=NameOfTheMigration

# Create a new empty migration
$ npm run migration:create --name=NameOfTheMigration

# Revert the change of the last migration
$ npm run migration:revert
```

## Environnement

```env
DB_HOST=host
DB_PORT=port
DB_USERNAME=username
DB_PASSWORD=password
DB_DATABASE=databaseName

JWT_SECRET=jwt_secret
JWT_VALIDITY=jwt_validity_time_in_day
JWT_REMEMBER_VALIDITY=jwt_remember_validity_time_in_day

PORT=port_of_server
```

## Usage Examples

`{{apiUrl}}/user/register`
```json
{
    "email": "email",
    "name": "name",
    "password": "password",
    "remember": true/false
}
```

`{{apiUrl}}/user/login`
```json
{
    "email": "email",
    "remember": true/false,
    "password": "password"
}
```

`{{apiUrl}}/user/logout`
```json
{
    "token": "token"
}
```

## Contributions

Contributions are welcome! If you have suggestions, improvement ideas, or want to fix issues, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
