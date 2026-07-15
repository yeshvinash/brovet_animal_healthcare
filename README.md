# Brovet Animal Healthcare React Frontend

This is the modern React + Vite codebase for [Brovet Animal Healthcare](https://brovetanimalhealth.com/), a B2B veterinary supplement manufacturer and exporter based in India. This app serves as a digital product catalog and RFQ platform for dealers, veterinarians, and exporters.

---

## Features

- **Product Catalog**: Explore premium veterinary feed supplements with detailed product specs, benefits, and usage.
- **RFQ System**: Dealers, distributers, and exporters can request quotations for wholesale orders.
- **Informational Pages**: About Us, Quality Assurance, Infrastructure, Dealer Network, Blogs, and FAQs.
- **Admin Interface**: Dealer management, product updates, and content control (basic prototype).
- **Modern UI**: Built with Tailwind CSS & React, featuring accessible, responsive design and branded styles.
- **SEO Friendly**: Meta tags and routes optimized for discoverability.
- **LocalStorage DB**: All data (products, orders, settings) is mocked and persisted via a local in-browser database.
- **High Code Quality**: Modular React components, strict linting, and code formatting.

---

## Quickstart

1. **Install** dependencies:

   ```bash
   npm install
   ```

2. **Run** development server:

   ```bash
   npm run dev
   ```

3. **Open** your browser at [http://localhost:5173](http://localhost:5173)

---

## Project Structure

- `src/components/` — Reusable UI components (Navbar, Footer, Forms, Shared, etc)
- `src/pages/` — Route-based top-level pages (Home, About, Products, Admin, etc)
- `src/utils/db.js` — LocalStorage mock database with rich seed data for demoing the platform
- `src/assets/` — Brand images, icons, and cover art
- `src/index.css` — Tailwind theming & global styles

---

## Technologies

- **React** (Vite, React Router)
- **Tailwind CSS** (utility-first styles, custom color tokens)
- **Oxlint** (strict, fast JS linting)
- **LocalStorage** (zero external backend/API for mock DB)

---

## Deploy

- To build for production:

  ```bash
  npm run build
  ```

- To preview the prod build locally:

  ```bash
  npm run preview
  ```

---

## Feedback & License

Demo project for Brovet Animal Healthcare. For feedback or business inquiries, see [brovetanimalhealth.com](https://brovetanimalhealth.com/).

MIT License. Commercial use, redistribution, and derivative works prohibited without express permission. © Brovet Animal Healthcare.
