# BookDZ: Online Bookstore (React + Redux)


- Live app: https://bookdz-store.vercel.app
- Backend API repo: https://github.com/ManelBoutria/bookdz-api

## Description

BookDZ is an online bookstore. The React app loads the books from the BookDZ REST API (Node.js, Express, MongoDB) and lets users register, log in and buy books. The shopping cart and the login state are managed by Redux.

## Features

- Books loaded from the backend (`GET /api/products`), with search and category filter
- Register and Login (JWT), login kept after a page refresh
- Two roles:
  - **Customer**: browses books, uses the cart and checks out (demo checkout, no payment)
  - **Admin (seller)**: opens **Manage books** to add, edit and delete books
- Shopping cart: add, increase, decrease, remove, total price
- Responsive design (phone, tablet, desktop)

## Technologies used

- React (Vite) and JSX
- Redux Toolkit and React-Redux (`cart` and `auth` slices)
- CSS3 (Flexbox, Grid, media queries)
- Fetch API to talk to the backend
- Node.js / npm, Git and GitHub, Vercel

## Project structure

```
src/
  api.js                  helper for requests to the backend
  App.jsx                 pages: shop, login, register, admin
  components/             Header, Hero, ProductList, ProductCard, Cart,
                          AuthForm, Admin, BookCover
  redux/                  store.js, cartSlice.js, authSlice.js
```

## Installation and run

```bash
npm install
npm run dev
```

The app runs on `http://localhost:5173`.

By default it talks to the API at `http://localhost:3000` (run the backend locally).
To use another backend, create a `.env` file:

```
VITE_API_URL=https://bookdz-api-1.onrender.com
```

> The online backend is on a free plan: the first request after a break can take up to 50 seconds.

## Redux

- `cartSlice`: items in the cart (`addToCart`, `removeFromCart`, `increase`, `decrease`, `clearCart`).
- `authSlice`: the token and the logged-in user (`loginSuccess`, `logout`), saved in `localStorage`.

Components read the state with `useSelector` and change it with `useDispatch`.