# JastipHub

![JastipHub Banner](public/window.svg) <!-- Replace with real banner if available -->

**JastipHub** is a premium Personal Shopper platform built specifically to streamline the process of requesting, buying, and tracking exclusive items from around the world. It provides a luxurious and dynamic interface for customers while empowering administrators with a full-featured management dashboard.

---

## 🌟 Key Features

### For Customers
- **Modern & Premium UI:** Designed with a sleek, dark-themed glassmorphism aesthetic to provide a high-end shopping experience.
- **Product Catalog:** Browse curated items available for immediate order.
- **Custom Item Requests:** Looking for something specific? Submit a custom request directly to the admin with reference links and descriptions.
- **Seamless Checkout:** Easy-to-use checkout flow with support for uploading payment receipts.
- **Real-time Order Tracking:** Track the status of your order using your unique Order ID.

### For Administrators
- **Comprehensive Dashboard:** A real-time overview of total revenue, active products, pending verifications, and low stock alerts.
- **Product Management (CRUD):** Easily add, edit, view, and delete products from the catalog.
- **Order Management:** Review incoming orders, verify payments, and update shipping statuses (Pending → Paid → Purchased → Shipping → Completed) with tracking resi numbers.
- **Request Management:** Review and approve or reject custom item requests from customers.

---

## 🛠️ Technology Stack

JastipHub is built using cutting-edge web technologies to ensure performance, SEO out of the box, and a great developer experience.

- **Framework:** [Next.js 15+ (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** Custom CSS with CSS Modules and global tokens (Glassmorphism design system)
- **Database:** PostgreSQL (hosted on [Supabase](https://supabase.com/))
- **ORM:** [Prisma](https://www.prisma.io/) with `@prisma/adapter-pg`
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

Follow these steps to run the JastipHub project locally on your machine.

### Prerequisites
- Node.js 18+ installed
- A Supabase account (or any PostgreSQL database)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/genthadjamal/jastiphub.git
   cd jastiphub
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add your PostgreSQL database URL:
   ```env
   DATABASE_URL="postgresql://user:password@host:port/database"
   ```

4. **Initialize the Database:**
   Generate the Prisma client and push the schema to your database.
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the Development Server:**
   ```bash
   npm run dev
   ```

6. **View the App:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

- `src/app/` - Next.js App Router pages (Home, Checkout, Track, Admin, etc.)
- `src/app/actions/` - Next.js Server Actions handling direct database operations safely.
- `src/components/` - Reusable React components (Navbar, Footer, Buttons).
- `src/lib/` - Shared utilities, such as the Prisma database client implementation (`prisma.ts`).
- `prisma/` - Prisma schema definitions (`schema.prisma`).

---

## 🛡️ Secure Server Actions
Instead of building a separate REST API, JastipHub utilizes Next.js Server Actions (`'use server'`) to perform CRUD operations securely on the server-side, reducing client-side JavaScript bundling and preventing database credentials from leaking to the frontend.

---

## 📝 License
Copyright 2026 JastipHub Platform. All rights reserved.