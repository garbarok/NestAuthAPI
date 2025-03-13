# NestJS Auth API

A robust backend API built with NestJS, TypeORM, and OAuth authentication following Clean Architecture principles.

## Features

- 🔐 Authentication with JWT
- 🔑 OAuth integration with Google and GitHub
- 📝 User management
- 📄 Blog posts CRUD operations
- 📚 API documentation with Swagger
- 🗄️ PostgreSQL database with TypeORM
- 🏗️ Clean Architecture design
- 🧩 Modular structure with domain separation

## Project Structure

The project follows a modular clean architecture approach where each domain context (users, auth, posts) has its own clean architecture layers:

```bash
src/
├── app.module.ts        # Main application module
├── main.ts              # Application entry point
├── auth/                # Authentication context
│   ├── domain/          # Auth domain layer
│   ├── application/     # Auth application layer
│   │   ├── dto/         # Data Transfer Objects
│   │   └── services/    # Application services
│   ├── infrastructure/  # Auth infrastructure layer
│   │   ├── controllers/ # Controllers
│   │   ├── guards/      # Authentication guards
│   │   └── strategies/  # Passport strategies (JWT, Google, GitHub)
│   └── auth.module.ts   # Auth module definition
├── users/               # Users context
│   ├── domain/          # Users domain layer
│   │   ├── entities/    # Domain entities
│   │   └── repositories/# Repository interfaces
│   ├── application/     # Users application layer
│   │   ├── dto/         # Data Transfer Objects
│   │   └── services/    # Application services
│   ├── infrastructure/  # Users infrastructure layer
│   │   ├── controllers/ # Controllers
│   │   ├── entities/    # ORM entities
│   │   └── repositories/# Repository implementations
│   └── users.module.ts  # Users module definition
└── posts/               # Posts context
    ├── domain/          # Posts domain layer
    │   ├── entities/    # Domain entities
    │   └── repositories/# Repository interfaces
    ├── application/     # Posts application layer
    │   ├── dto/         # Data Transfer Objects
    │   └── services/    # Application services
    ├── infrastructure/  # Posts infrastructure layer
    │   ├── controllers/ # Controllers
    │   ├── entities/    # ORM entities
    │   └── repositories/# Repository implementations
    └── posts.module.ts  # Posts module definition
```

## Clean Architecture Design

This project implements Clean Architecture with the following layers:

1. **Domain Layer**: Contains business entities and repository interfaces. This layer has no dependencies on other layers.

2. **Application Layer**: Contains use cases, services and DTOs. Depends only on the domain layer.

3. **Infrastructure Layer**: Contains implementations of repositories, controllers, and external service integrations. Depends on the application and domain layers.

Each context (auth, users, posts) implements this pattern independently, promoting separation of concerns and maintainability.

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- PostgreSQL
- npm | yarn | pnpm | bun

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DATABASE=nestauth

# JWT
JWT_SECRET=your_jwt_secret_key

# OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback
```

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run start:dev
```

### API Documentation

Once the application is running, you can access the Swagger documentation at:

```bash
http://localhost:3000/api
```

## Authentication

### JWT Authentication

The API uses JWT for authentication. To access protected routes, include the JWT token in the Authorization header:

```bash
Authorization: Bearer your_jwt_token
```

### OAuth Authentication

The API supports OAuth authentication with Google and GitHub. Use the following endpoints to initiate the OAuth flow:

- Google: `/auth/google`
- GitHub: `/auth/github`

## License

This project is licensed under the MIT License.
