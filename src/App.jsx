import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import AuthForm from "./components/AuthForm";
import Admin from "./components/Admin";
import "./App.css";

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  // which page is shown: "shop" | "login" | "register" | "admin"
  const [view, setView] = useState("shop");

  return (
    <>
      <Header onCartClick={() => setCartOpen(true)} onNavigate={setView} />
      {view === "shop" && (
        <>
          <Hero />
          <ProductList />
        </>
      )}
      {view === "login" && <AuthForm mode="login" onNavigate={setView} />}
      {view === "register" && <AuthForm mode="register" onNavigate={setView} />}
      {view === "admin" && <Admin />}
      <footer>© 2026 BookDZ</footer>
      <Cart open={cartOpen} onClose={() => setCartOpen(false)} onNavigate={setView} />
    </>
  );
}

export default App;
