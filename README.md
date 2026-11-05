<div align="center">

# 🎓 CodeNest Academy

**Enterprise-Grade Full-Stack Developer Education & Career Platform**

[![Next.js](<https://img.shields.io/badge/Next.js-15_(App_Router)-black?style=for-the-badge&logo=next.js>)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-Mongoose-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

[🌐 Live Production Platform](https://codenest-academy-lamiakajal.vercel.app) • [📁 GitHub Repository](https://github.com/lamiakajal/codenest-academy)

</div>

---

## 📌 Executive Overview

**CodeNest Academy** is a modern, high-performance web platform built to deliver structured technical curricula and seamless student intake. Engineered on Next.js 15 App Router and MongoDB, it features resilient authentication pipelines, administrative enrollment telemetry, email integration fallback, dynamic animations, and edge-ready security primitives.

---

## 🚀 Key Architectural Features

- **🔐 Robust Authentication & Session Architecture:**
  - Secure credential registration and sign-in powered by `bcrypt` (12-round hashing).
  - Signed, tamper-proof 7-day persistent session management via `httpOnly`, `SameSite` cookies.
  - Secure one-time tokenized password reset system (`/forgot-password`) with 30-minute expiry validation.

- **📊 Comprehensive Administrative Operations (`/admin`):**
  - Dedicated administrative workspace restricted via server-side identity assertion (`ADMIN_EMAILS`).
  - Real-time aggregation metrics: total users, active program enrollments, and newsletter subscribers.
  - Granular workflow state management (`Pending` ➔ `Contacted` ➔ `Confirmed`).

- **🛡️ Edge-Grade Security & Traffic Throttling:**
  - Sliding-window in-memory rate limiting across mutation vectors (Sign-in: 10 req / 15m; Enroll & Newsletter throttled).
  - Custom HTTP security response headers preventing MIME sniffing, framing, and XSS exploits.

- **🎨 Dynamic UI/UX & Motion Engineering:**
  - Bespoke 60 FPS interactive physics-driven canvas layer with native user `prefers-reduced-motion` compliance.
  - System-synced Light/Dark theme switching with zero layout-shift hydration.
  - Smooth custom transitions, dynamic scroll progress indicators, and specialized brand loaders.

- **📬 Scalable Messaging Engine:**
  - Modular transactional email integration with SMTP capabilities.
  - Zero-config development console fallback (reset links printed to standard output for seamless local validation).

---

## 🛠️ Technology Stack

| Layer              | Technology                                        |
| :----------------- | :------------------------------------------------ |
| **Framework**      | Next.js 15 (React 19, Server & Client Components) |
| **Language**       | TypeScript (Strict type safety)                   |
| **Styling**        | Tailwind CSS v4, Lucide Icons                     |
| **Database**       | MongoDB Atlas with Mongoose ODM                   |
| **Authentication** | Custom Session Tokens & `httpOnly` secure cookies |
| **Email Service**  | Nodemailer with development console fallback      |
| **Deployment**     | Vercel Serverless Edge Platform                   |

---

## 📂 Project Directory Architecture

```text
codenest-academy/
├── public/                # Static assets, branding graphics, and avatars
├── src/
│   ├── app/               # Next.js App Router (Pages, Layouts, API Handlers)
│   │   ├── (auth)/        # Authentication routes (/signin, /signup, /forgot-password)
│   │   ├── account/       # Protected member portal
│   │   ├── admin/         # Role-protected administrative console
│   │   └── api/           # REST endpoints (auth, enroll, newsletter, admin)
│   ├── components/        # Modular UI systems (Sections, Navbar, Footer, UI primitives)
│   ├── data/              # Centralized site configurations, mentors, and tracks (site.ts)
│   ├── lib/               # Database client, rate limiters, security guards, mailers
│   └── models/            # Mongoose schemas (User, Enrollment, Subscriber)
├── .env.example           # Environment template specifications
└── package.json           # Manifest and dependency tree
```
