# VK Auth & VK Secure 🛡️

> **One Identity. Every VK Product.**

**VK Auth** is a centralized **Identity Provider (IdP)** and **Single Sign-On (SSO)** platform designed for the entire VK application ecosystem (**BodhAI**, **MilkLedger**, **Invoice System**, **RapidHost**, **VEDA**, and future SaaS applications).

---

## 🌟 Key Features

- 🔐 **Centralized Identity & SSO**: Single Sign-On across all current and future VK products.
- 🗄️ **Decoupled Database Architecture**: VK Auth owns identity (`vk_user_id`), while applications retain their own independent databases (MongoDB, PostgreSQL/Neon, Firebase, Cloudflare KV).
- 🛡️ **Enterprise Security (VK Secure)**:
  - Password hashing with **Argon2id** (`@node-rs/argon2`).
  - Asymmetric token signing & verification via **`jose`** (`RS256` / `ES256`).
  - OAuth 2.0 / OIDC Authorization Code Flow with **PKCE**.
  - Strict `state` validation to prevent login injection and CSRF attacks.
- 💻 **Active Session Control**: Real-time device tracking and remote session revocation.
- 🎨 **Modern Glassmorphic Portal**: Built with Next.js 15, Vanilla CSS glassmorphism, and responsive UI components.

---

## 🏗️ System Architecture

```
                        ┌───────────────────────────────┐
                        │      VK AUTH (IdP / SSO)      │
                        │  One Account. Every Product.  │
                        └───────────────┬───────────────┘
                                        │
             ┌──────────────────────────┼──────────────────────────┐
             ▼                          ▼                          ▼
      ┌─────────────┐            ┌─────────────┐            ┌─────────────┐
      │   BodhAI    │            │ Invoice System│          │  RapidHost  │
      └──────┬──────┘            └──────┬──────┘            └──────┬──────┘
             │                          │                          │
             ▼                          ▼                          ▼
      MongoDB Database           PostgreSQL Database        Cloudflare KV
```

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 (App Router), React 19, Vanilla CSS (Glassmorphism), Lucide Icons
- **Backend API**: Hono Framework (TypeScript)
- **Database & ORM**: Neon PostgreSQL + Drizzle ORM
- **Security & Caching**: Upstash Redis (OAuth state, OTP, Sliding Rate Limiting)
- **Cryptography**: Argon2id (`@node-rs/argon2`), `jose` (JWT / JWKS)
- **Deployment**: Vercel & Cloudflare Edge

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/webdeveloperdesigner/VK-Secure.git
cd VK-Secure/vkauth
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file inside the `vkauth` directory:

```env
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret_here
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the VK Auth portal.

---

## 📚 API Endpoints Overview

| Method | Endpoint                | Description                                 |
| :----- | :---------------------- | :------------------------------------------ |
| `GET`  | `/api/v1/health`        | Health check endpoint                       |
| `POST` | `/api/v1/auth/register` | Register a new VK Identity                  |
| `POST` | `/api/v1/auth/login`    | Authenticate user & return JWT access token |
| `GET`  | `/api/v1/auth/me`       | Verify Bearer access token                  |

---

## 📄 License

Copyright © 2026 VK. All rights reserved.
