### Client Site

#### 🌱 Overview

This is the main public site for users/farmers to access features like cold storage booking, soil monitoring, plant info, contact forms, FAQs, and dashboards.

#### 📦 Pages

- `/ColdStorage`: Search and book storages
- `/SoilData`: Live sensor data, gauge view, PDF download
- `/Plants`: View cultivation guides
- `/ContactUs`, `/AboutUs`, `/FAQs`

#### 🧾 Features

- Mobile-friendly and accessible forms
- MUI-based modals and responsive layout
- Conditional rendering for authenticated roles
- PDF Report Generation using `jsPDF` and `html2canvas`

#### 🛠 How to Run

```bash
cd Client
npm install
npm start
```

Ensure `.env` contains `REACT_APP_BACKEND_URL` pointing to backend.
