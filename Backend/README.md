### Backend

#### 🧠 Purpose

The backend is built with Express.js, providing REST APIs for managing users, plants, cold storages, soil data, bookings, and authentication.

#### 🔐 Authentication

- JWT-based user authentication
- Protected routes using middleware
- Separate roles for `admin`, `farmer`, etc.

#### 📦 Modules

- `/controllers`: Logic for handling routes
- `/routes`: All defined API endpoints
- `/models`: Mongoose schemas
- `/middleware`: Auth and validation middlewares

#### 📁 Example API Structure

```javascript
POST / auth / register;
POST / auth / login;
GET / plants;
POST / bookings / book;
```

#### 🛠 How to Run

```bash
cd Backend
npm install
npm run dev
```

Make sure `.env` file is configured with Mongo URI and JWT Secret.
