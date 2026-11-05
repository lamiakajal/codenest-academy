# CodeNest Academy

A full-stack coding school website built with Next.js (App Router), TypeScript, Tailwind CSS v4, MongoDB (Mongoose) and cookie-based authentication.

## What is included

- Responsive home page: hero with animated code editor, results strip, courses, why-CodeNest features, 16-week roadmap, mentors, campus, student projects, testimonials, FAQ and call to action
- Light and dark mode (saved in the browser), custom scrollbar, scroll progress bar, back-to-top button
- Launch screen with the logo and a round loader, plus a round loader for every page transition
- Custom 404 page and error page
- Sign up, sign in and sign out (bcrypt password hashing, signed httpOnly cookie)
- Enrollment form and newsletter form that save to MongoDB
- Forgot and reset password by email link, welcome and enrollment emails (SMTP optional)
- My account page (protected) and an admin dashboard at /admin to review enrollments and change their status
- Rate limiting on sign in, sign up, enroll, newsletter and password reset
- All text and code comments are in English

## Run it locally

```bash
npm install
cp .env.example .env.local   # then fill in the two values
npm run dev
```

Open http://localhost:3000. The website works without a database. Only sign up, sign in, enroll and newsletter need MongoDB, and they show a clear message until `MONGODB_URI` is set.

## Connect MongoDB

1. Create a free cluster on MongoDB Atlas (or run MongoDB locally).
2. Put the connection string in `.env.local` as `MONGODB_URI`.
3. Put a long random string in `AUTH_SECRET`. Generate one with `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"`.
4. Restart `npm run dev`. Collections (`users`, `enrollments`, `subscribers`) are created automatically.

## Admin dashboard

1. Create your own account on the Sign up page first.
2. Put that email in `ADMIN_EMAILS` in `.env.local` and restart the server.
3. Sign in and open `/admin`. Other visitors see a normal 404 page.

Create the admin account before the site is public. Email addresses are not verified yet, so someone could register an admin email before you do.

## Emails

Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` and `MAIL_FROM` to send real emails (any SMTP provider works). Without them, emails are printed in the terminal, so you can still copy the password reset link while testing. Set `SITE_URL` to your real domain in production.

## Deploy

Add `MONGODB_URI` and `AUTH_SECRET` as environment variables on your host (for example Vercel), then deploy. In MongoDB Atlas, allow the host's IP addresses under Network Access.

## Project structure

```
src/
  app/            pages, layout, loading, 404 and API routes (api/auth, api/enroll, api/newsletter)
  components/     layout (navbar, footer), sections (home page blocks), ui (shared pieces)
  data/site.ts    all website content: courses, mentors, FAQ, roadmap, projects
  lib/            database connection, session helpers, validators
  models/         Mongoose models (User, Enrollment, Subscriber)
public/images/    SVG illustrations
```

## Editing content

Almost all text lives in `src/data/site.ts`. Change the school name, contact details, prices, mentors and questions there.
