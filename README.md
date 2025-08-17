# FE Project

This is a **React + TypeScript** front-end project for displaying hierarchical character data in an interactive table. It uses **React Bootstrap** for UI components and **Zustand** for state management. The data can be either fetched from a mock server or integrated with a real backend.

---

## Features

- Interactive **tree table** with expandable/collapsible rows
- Supports **nested children** (nemesis, secret codes, etc.)
- **Delete nodes** along with all children
- Marks **duplicate IDs** with a warning icon
- Formatted **dates, numbers, and booleans**
- Responsive and styled using **Bootstrap 5**
- Modal confirmation for delete actions

---

## Technologies

- **React 19** + TypeScript
- **Zustand** for state management
- **React Bootstrap** for components
- **Vite** for build & dev server
- **UUID** for unique IDs
- **Express + LowDB** (mock server)

---

## Installation

1. Clone the repository:

git clone https://github.com/vojta699/FE---TASK.git
cd FE---TASK

2. Install dependencies:

npm install

## Available Scripts
1. Start development server
npm run dev

Opens the app at http://localhost:5173 by default

2. Build project
npm run build

Compiles TypeScript and builds the Vite project

3. Preview build
npm run preview

Serves the production build locally

4. Run mock API server
npm run mock

Runs a local Express + LowDB server serving mock character data at http://localhost:3001 by default

5. Lint
npm run lint

Lints the project with ESLint

## Project basic structure
src/
project-root/
├─ public/
│   └─ example-data.json       # mock data for JSON Server
├─ src/
│   ├─ api/                    # API layer
│   ├─ features/
│   │   └─ tree/               # modul Tree
│   │       ├─ components/     # components for modul
│   │       │   └─ styles/     # CSS styles for components
│   │       ├─ store/          # Zustand store for modul
│   │       ├─ types/          # types for modul
│   │       ├─ utils/          # utils for modul
│   │       └─ index.ts        # exports for modul
│   ├─ services/               # Business logic
│   ├─ pages/                  # Pages (route-level components)
│   ├─ types/                  # Shared types for whole project
│   ├─ App.tsx
│   ├─ main.tsx
│   └─ index.css
│
├─ .env                        # config
├─ package.json
└─ tsconfig.json
└─ index.tsx                   # Entry point
server.js                      # Mock server

## How to Use

Click on row IDs to expand/collapse children

Duplicate IDs are displayed with ⚠️ icon

Click Remove to delete a node (modal confirmation appears)

Table headers adjust depending on tree depth

Dates, booleans, and numeric values are automatically formatted