# E-Commerce Inventory & Stock Management Dashboard

A single-page React application (Vite + React) for managing product inventory.
Built for Web Engineering — Assignment no 02: Advanced React Component
Architecture & State Management.

## Features (mapped to the assignment tasks)

- **Task 1 — Component-Based Architecture:** modular components under
  `src/components/functional/` and `src/components/class/`, theme context
  under `src/context/`, and the main view in `src/App.jsx`.
- **Task 2 — Functional Components & Props:** ProductForm, ProductList,
  ProductCard and Header are functional components; state and callback props
  flow from parent to child; CardWrapper uses `props.children`.
- **Task 3 — Class Components & Lifecycle Methods:** AuditLogger is a class
  component using `componentDidMount`, `componentDidUpdate`,
  `componentWillUnmount`, `this.state` and `this.setState()`.
- **Task 4 — JSX vs. JavaScript Logic:** dynamic `{...}` expressions, ternary
  and `&&` conditional rendering, `.map()` lists with unique keys, and
  `onClick` / `onChange` / `onSubmit` synthetic events.
- **Task 5 — React Hooks Mastery:** `useState` (inventory, form, filters),
  `useEffect` (localStorage sync + document title), `useContext` (Light/Dark
  ThemeContext), `useRef` (form input focus), `useMemo` / `useCallback`
  (filtering, totals, handlers).
- **Task 6 — CSR vs. SSR:** comparison below.

## How to run

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Project structure

```text
src/
├── components/
│   ├── class/
│   │   └── AuditLogger.jsx
│   └── functional/
│       ├── ProductForm.jsx
│       ├── ProductList.jsx
│       ├── ProductCard.jsx
│       ├── CardWrapper.jsx
│       ├── Header.jsx
│       ├── InventoryMetrics.jsx
│       └── ThemeToggle.jsx
├── context/
│   └── ThemeContext.jsx
├── hooks/
├── App.jsx
├── main.jsx
└── index.css
```

## Task 6 — CSR vs. SSR

Client-Side Rendering (CSR) and Server-Side Rendering (SSR) differ mainly in
where and when a page is built. In CSR, which is how a standard Vite + React
single-page application works, the server sends a small, almost empty HTML
file together with JavaScript files to the browser. The browser then downloads
the JavaScript, runs it, and builds the page on the user's own device. Because
of this, the first load can feel slow: the user sees little until the
JavaScript has loaded and run. After that, however, the app feels fast,
because moving between views does not reload the whole page. In SSR, which
frameworks like Next.js use, the server builds the full HTML page before
sending it. The browser therefore shows real content immediately, and the
JavaScript loads afterwards to make the page interactive. For performance, CSR
suits apps where users stay logged in and move around a lot, like this
inventory dashboard, because later navigation is instant. SSR is better when
the first load must be quick, for example on slow networks. For SEO, SSR is
stronger, because search engines receive complete content at once, while a
CSR page can look empty to a search engine until its JavaScript runs. For
hosting, CSR is simpler and cheaper, because any static host can serve its
files, while SSR needs a server that runs code for every request, which costs
more and needs more setup. For an enterprise e-commerce application, the
choice depends on the page: SSR usually wins for public product pages that
need search traffic and fast first loads, while CSR fits private dashboards,
like this inventory system, where users log in and work inside the app all
day.
