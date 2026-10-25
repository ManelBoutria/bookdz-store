import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import "./App.css";

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Header onCartClick={() => setCartOpen(true)} />
      <Hero />
      <ProductList />
      <footer>© 2026 BookDZ</footer>
      <Cart open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

export default App;
