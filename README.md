# Notes Management Nest.js

### Project idea

Notes Management API adalah backend service berbasis NestJS yang dirancang sebagai fondasi aplikasi pencatatan (notes).
Versi v1 ini fokus ke core backend setup.

Project ini sengaja disusun modular supaya mudah dikembangkan ke v2+ (auth lebih kompleks, role, sharing notes, dll).

# Goals v1

Pada versi pertama ini, target utamanya adalah:

- Koneksi database menggunakan Prisma
- CRUD Notes
- Struktur folder rapi & scalable

❌ Belum fokus ke fitur lanjutan (RBAC, pagination advance, caching, dsb)

# Tech Stack

- Node.js
- TypeScript
- NestJS
- TypeORM
- Database: MySQL
- Testing: Jest (unit & e2e)

# Project Structure

```
src/
├── main.ts
├── app.module.ts

├── common/
│   ├── guards/
│   ├── interceptors/
│   └── pipes/
│   └── data/

├── config/
│   ├── app.config.ts
│   ├── database.config.ts
│   ├── jwt.config.ts
│   └── index.ts

├── modules/
│   │
│   ├── notes/
│   │   ├── entity/
│   │   ├── types/
│   │   ├── notes.controller.ts
│   │   ├── notes.service.ts
│   │   └── notes.module.ts
│   │
│   └── ...

└── test/
    └── e2e/

```

# Getting Started

```
pnpm install # install dependencies
pnpm run start:dev # run application
```

# Notes API (v1)

| Method | Endpoint     | Description     |
| ------ | ------------ | --------------- |
| GET    | `/notes`     | Get all notes   |
| GET    | `/notes/:id` | Get note by ID  |
| POST   | `/notes`     | Create new note |
| PUT    | `/notes/:id` | Update note     |
| DELETE | `/notes/:id` | Delete note     |

# Roadmap (next version)

- JWT refresh token
- Role & permission
- Pagination & filtering
- Soft delete
- API response standardization
- Docker support
