[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/2EJ5Xvqu)
# 🛍️ Revo Shop — Full-Stack Next.js E-Commerce Admin

Revo Shop is a full-stack e-commerce admin application built with **Next.js App Router** and **TypeScript**.
It demonstrates role-based authentication, product management (CRUD), API route design, and unit testing.

The project focuses on building a realistic admin workflow while applying modern React and Next.js best practices.

---

# ✨ Features

## 👤 User

* Browse products
* View product details
* Add items to cart

## 🛠️ Admin

* Create new products
* Edit existing products
* Delete products
* Role-based access control

---

# 🧰 Tech Stack

**Frontend**

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS

**Backend**

* Next.js API Routes
* NextAuth (Credentials Provider)
* JWT session strategy

**Testing**

* Jest
* React Testing Library

---

# 🏗️ Architecture Highlights

* App Router with server and client components
* API proxy layer for external Platzi API
* Role propagation via JWT → session
* Debounced search for product filtering
* Modular hooks and context providers
* Admin route protection using session role

---

# 🧪 Testing

The project includes unit tests for:

* Authentication behavior
* API routes (products & categories)
* React hooks
* UI components

Test coverage is **~60%+**, covering core business logic and critical flows.

Run tests:

```bash
npm test
```

---

# 🚀 Getting Started

## 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/revo-shop.git
cd revo-shop
```

## 2️⃣ Install dependencies

```bash
npm install
```

## 3️⃣ Run the development server

```bash
npm run dev
```

App will be available at:
👉 http://localhost:3000

---

# 🔐 Demo Credentials

**Admin**

```
admin@revo.shop
admin123
```

**User**

```
user@revo.shop
user123
```

---

# 📂 Project Structure

```
src/
  app/            → pages & API routes
  components/     → UI components
  context/        → global providers (cart, session)
  hooks/          → custom hooks
  lib/            → auth & API utilities
  __tests__/      → unit tests
```

---

# 🔮 Future Improvements

* Database integration (Prisma + PostgreSQL)
* End-to-end testing (Playwright)
* Image upload support
* Backend pagination & filtering
* CI pipeline for automated testing
* Deployment (Vercel)

---

# 🎯 Learning Goals Achieved

This project demonstrates:

* Full-stack Next.js architecture
* Authentication & role-based authorization
* API design and validation
* State management with React context
* Testing strategy for frontend & backend
* Debugging and performance optimization

---

# 📄 License

This project is for educational and portfolio purposes.

---

## 🙌 Acknowledgements

Product data powered by the Platzi Fake Store API.

---

**Built with Next.js + TypeScript**
