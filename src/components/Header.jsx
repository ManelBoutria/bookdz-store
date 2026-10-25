import { useSelector } from "react-redux";

function Header({ onCartClick }) {
  const count = useSelector((state) =>
    state.cart.items.reduce((sum, i) => sum + i.quantity, 0)
  );

  return (
    <header className="header">
      <a href="#home" className="logo">BookDZ</a>
      <nav>
        <a className="link" href="#home">Home</a>
        <a className="link" href="#shop">Shop</a>
        <button className="cart-btn" onClick={onCartClick}>
          🛒 Cart ({count})
        </button>
      </nav>
    </header>
  );
}

export default Header;
