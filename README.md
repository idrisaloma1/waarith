# Alwaarith School Website Template

A professional, full-stack school website template built with **React + Express + Node.js**.
Designed as a template for EduTec customer schools — easily rebranded per school.

## Features

- 🏫 **6 Public Pages**: Home, About, Academics, Admissions, Events, Contact
- 🔐 **Admin Dashboard**: Manage events, view applications, update school settings
- 📅 **Event Management**: Create, edit, delete, and categorize school events
- 📋 **Admissions System**: Online application form with admin review panel
- 🌐 **Portal Integration**: EduTec portal deep-link in navbar and hero
- 📱 **Fully Responsive**: Mobile-optimized on all pages
- 🎨 **Theme Customizable**: Colors, school info, content all editable from admin
- ⚡ **Production Ready**: Built for Railway + Supabase deployment

## Quick Start

```bash
# 1. Install all dependencies
npm run install:all

# 2. Set up environment
cp .env.example .env
# Edit .env with your values

# 3. Start development (runs both server + client)
npm run dev
```

## Admin Access

- **URL**: http://localhost:3000/login  
- **Email**: admin@alwaarithschool.edu  
- **Password**: admin123

## Project Structure

```
alwaarith-school/
├── server/                 # Express backend
│   ├── index.js            # Server entry
│   ├── db.js               # In-memory data store (swap with Supabase)
│   ├── middleware/auth.js   # JWT auth middleware
│   └── routes/             # API routes
│       ├── auth.js
│       ├── events.js
│       ├── school.js
│       ├── pages.js
│       └── admissions.js
└── client/                 # React frontend
    └── src/
        ├── components/
        │   ├── layout/     # Navbar, Footer
        │   ├── sections/   # Hero
        │   └── common/     # EventCard
        ├── pages/          # Home, About, Academics, Admissions, Events, Contact, Admin
        ├── context/        # AuthContext
        └── api.js          # API service layer

```

## Deploying to Railway

1. Push this repo to GitHub
2. Create a new Railway project → Deploy from GitHub
3. Set environment variables in Railway dashboard
4. For production Supabase DB, update `server/db.js` to use `@supabase/supabase-js`

## Customizing Per School

All school info (name, colors, tagline, contact, portal URL) is editable from:
- **Admin Dashboard → School Settings** tab
- Or directly in `server/db.js` for the default values

## Connecting EduTec Portal

Set the `portalUrl` in School Settings to point to the school's EduTec instance.
The link appears in the Navbar and Hero section automatically.

---

Built with ❤️ by EduTec · Powering school websites across Nigeria
