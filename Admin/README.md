### Admin Panel

#### 📋 Overview

Admin panel offers full control over CRUD operations for Plants, Soil, Fertilizer, Pesticide, Cold Storages, and Bookings. Authentication is role-protected.

#### ⚙️ Features

- Dashboard with metrics
- Form-based management (Add/Edit/Delete)
- Toast notification integration
- Protected Routes with Auth Middleware
- Clean layout with responsive design

#### 📁 Key Files

- `/components`: UI components like forms, tables
- `/pages`: Specific pages per entity (e.g. Plants.tsx, ColdStorage.tsx)
- `/services`: Axios calls using `authHelper.tsx`

#### 🛠 How to Run

```bash
cd Admin
npm install
npm run start
```

Ensure `.env` contains `REACT_APP_BACKEND_URL` pointing to backend and backend server is running on the correct API base URL.
