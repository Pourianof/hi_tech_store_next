# HiTech Store - Next.js Frontend

A modern e-commerce frontend built with **Next.js 15** using the **App Router** architecture.

This project provides the client-side UI for the HiTech Store backend API and focuses on performance, type safety, and modern React patterns.

---

## Features

- ⚡ Built with Next.js 15 App Router
- 🎨 Responsive UI powered by Tailwind CSS v4
- 🔄 Data fetching and caching using TanStack React Query
- 📝 Form management with React Hook Form
- 🎯 Material UI components
- 🔐 Authentication with Auth.js (NextAuth)
- 🐳 Docker-ready production deployment

---

## Backend API

This repository contains **only the frontend application**.

The backend API is maintained in a separate repository:

**https://github.com/Pourianof/HiTechSolution**

The frontend communicates with that API for authentication, products, categories, brands, shopping cart, and other business operations.

---

## UI Design

The user interface is implemented based on the following free Figma Community design:

https://www.figma.com/community/file/1286698427874906194

All design credits belong to the original Figma author.

---

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- TanStack React Query
- Material UI (MUI)
- React Hook Form
- Auth.js (NextAuth)
- Docker

---

## Local Development

Before running this project locally, make sure the **HiTechSolution Backend API** is running.

The frontend depends on the backend API for most of its functionality, including:

- Authentication
- Products
- Categories
- Brands
- Shopping Cart
- Administrative Dashboard
- Other business operations

Clone and run the backend project first:

```bash
git clone https://github.com/Pourianof/HiTechSolution.git
```

After starting the backend server, configure the frontend environment variables (such as `API_SERVER_ADDRESS`) to point to the backend instance.

Then install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## Production Build

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

---

## Environment Variables

Create a `.env.local` file and configure the required variables.

Example:

```env
API_SERVER_ADDRESS=http://localhost:5108
AUTH_URL=http://localhost:3000
AUTH_SECRET=your-secret
```

Additional variables may be required depending on your deployment environment.

---

## Docker

The project can be deployed using Docker.

Build the image:

```bash
docker build -t hi-tech-store .
```

Run the container:

```bash
docker run -p 3000:3000 hi-tech-store
```

For production deployments, it is recommended to provide environment variables at runtime rather than embedding them into the image.

---

## License

This project is intended for educational and demonstration purposes.

The UI design belongs to its original Figma Community author under its respective license.

The backend implementation is maintained in a separate repository.
