# BookDZ: Online Bookstore (React + Redux)

**Student:** Manal Boutria
**Module:** WAMD, ENSTA (TD-TP 2)
**Store name:** BookDZ

## Description

BookDZ is a small online bookstore built with React and Redux. Users can browse books, search and filter them by category, and manage a shopping cart (add, remove, change quantities, see the total). The cart is stored in a global Redux store, so the header, the product cards and the cart panel always stay in sync.


**Live demo:** https://bookdz-store.vercel.app/

## Technologies used

- React (Vite)
- JavaScript (ES6+) and JSX
- Redux Toolkit and React-Redux
- CSS3 (Flexbox, Grid, media queries)
- Node.js / npm
- Git, GitHub and Vercel

## Main React components

| Component | Role |
|---|---|
| `App` | Main component, holds the cart open/closed state |
| `Header` | Logo, navigation and cart counter (reads Redux state) |
| `Hero` | Welcome section |
| `ProductList` | Search bar, category filter and product grid (local state) |
| `ProductCard` | One book, receives data through props and dispatches `addToCart` |
| `Cart` | Cart panel: quantities, remove, clear, total |

## Redux state

The store (`src/redux/store.js`) contains one slice, `cart` (`src/redux/cartSlice.js`):

```js
{
  cart: {
    items: [
      { id, name, author, category, price, emoji, tint, quantity }
    ]
  }
}
```

**Actions / reducers:** `addToCart`, `removeFromCart`, `increase`, `decrease`, `clearCart`

**React-Redux:** `Provider` in `main.jsx`, `useSelector` to read the state and `useDispatch` to send actions.

## Implemented features

- Welcome page
- Product catalog with title, author, category and price
- Add to cart, remove from cart, clear cart
- Quantity management (+ / -)
- Cart total and live cart counter
- Product search
- Category filtering
- Responsive design (desktop, tablet, phone)

## Run the application

```bash
git clone https://github.com/ManelBoutria/bookdz-store.git
cd bookdz-store
npm install
npm run dev
```

Then open http://localhost:5173
