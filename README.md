# 🌶️ Mirchi Powder Store

> Premium production-ready ecommerce for traditional South Indian spice powders.
> Built with React 19 · Express · PostgreSQL · Tailwind CSS · JWT Auth · Nodemailer

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL running locally
- Git

### 1. Setup (Run Once)

**Double-click `setup.bat`** — it will:
1. Install all server + client npm packages
2. Copy product images to `client/public/images/`
3. Create & seed the PostgreSQL database (tables + 6 products + reviews)
4. Print the default admin credentials

### 2. Configure Environment

Edit `server/.env`:
```env
PG_USER=postgres
PG_HOST=localhost
PG_DATABASE=postgres
PG_PASSWORD=YourPostgresPassword
PG_PORT=5432

EMAIL_USER=your_gmail@gmail.com
EMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx   # Gmail App Password (16 chars)
ADMIN_EMAIL=your_admin@gmail.com

JWT_SECRET=change_this_to_a_long_random_string
JWT_EXPIRES_IN=8h
```

### 3. Start the App

Open **two terminals**:

```bash
# Terminal 1 — Backend
cd server
npm run dev       # starts on :5000

# Terminal 2 — Frontend
cd client
npm run dev       # starts on :3000
```

Open: **http://localhost:3000**
Admin: **http://localhost:3000/admin**

---

## 🔐 Admin Login

Default credentials (change after first login):
| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `Admin@123` |

The admin dashboard shows live orders, revenue, country distribution, and customer reviews.

---

## 📦 Products (6 Total)

| Product | Price | Weight | Spice |
|---------|-------|--------|-------|
| Masala Karam | ₹300 | 250g | 🌶🌶🌶 |
| Goddu Karam | ₹600 | 500g | 🌶🌶🌶🌶🌶 |
| Kandi Podi | ₹250 | 200g | 🌶🌶 |
| Nalla Karam | ₹350 | 300g | 🌶🌶🌶🌶 |
| Kobbari Karam | ₹280 | 200g | 🌶🌶 |
| Peanut Chutney Powder | ₹220 | 200g | 🌶 |

---

## 📧 Email Setup (Gmail)

1. Enable **2-Step Verification** on your Google account
2. Go to **Google Account → Security → App Passwords**
3. Create an App Password for "Mail"
4. Paste the 16-char password into `EMAIL_APP_PASSWORD` in `.env`

### Anti-Spam Headers Applied
- `text/plain` + `text/html` multipart body
- `Message-ID` with unique UUID
- `List-Unsubscribe` header
- `Precedence: transactional`
- TLS v1.2+ enforced

---

## 📁 Project Structure

```
mirchi-store/
├── client/                  # React 19 + Vite + Tailwind
│   ├── public/images/       # Product & hero images
│   └── src/
│       ├── components/      # Hero, ProductCard, OrderForm, etc.
│       ├── pages/           # Home, AdminDashboard, AdminLogin
│       └── services/api.js  # Axios API layer (with mock fallbacks)
│
├── server/                  # Express + Node.js
│   ├── controllers/         # auth, orders, products, reviews
│   ├── routes/              # /api/auth, /api/orders, etc.
│   ├── utils/email.js       # Nodemailer with anti-spam headers
│   └── scripts/             # init-db, copy-assets, gen-admin-hash
│
├── database/schema.sql      # Full PostgreSQL schema + seed data
├── setup.bat                # One-click Windows setup
└── README.md
```

---

## 🏗 Phase 2 — SSR Architecture (Planned)

The next sprint will implement the full enterprise architecture:
- **RBAC**: JWT roles + permissions middleware
- **Redis**: Job queue for async email/WhatsApp workers
- **WhatsApp API**: Order notifications via WhatsApp Business
- **Modular Monolith**: `modules/auth`, `modules/orders`, `modules/notifications`
- **Audit Logs**: Every admin action tracked in PostgreSQL
- **Sub-Admin Portal**: Limited permissions for staff accounts

---

## 🌶 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, Tailwind CSS |
| Backend | Node.js, Express 4 |
| Database | PostgreSQL 18 |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| Email | Nodemailer + Gmail SMTP (TLS) |
| Fonts | Cormorant Garamond, Merriweather |
| Images | AI-generated premium photography |
