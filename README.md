# Telegram Auth Backend & Frontend

Mini-site for Telegram authorization with 2FA support.

---

## 🚀 Running the Project Locally

### 1. Clone the repository

```bash
git clone <REPO_URL>
cd <REPO_FOLDER>
pnpm i
```

### 2. Run the frontend

```bash
pnpm dev
```

Don't forget add to file .env backend

```bash
NEXT_PUBLIC_BACKEND_URL=https://telegram-auth-backend-bdkc.onrender.com
```

Normally, .env files should not be shared publicly.
But here it only contains the backend URL, so it's fine.
