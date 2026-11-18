import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { clearCart } from "../redux/cartSlice";

function Header({ onCartClick, onNavigate }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const count = useSelector((state) =>
    state.cart.items.reduce((sum, i) => sum + i.quantity, 0)
  );

  function handleLogout() {
    dispatch(logout());
    dispatch(clearCart());
    onNavigate("shop");
  }

  return (
    <header className="header">
      <button className="logo" onClick={() => onNavigate("shop")}>BookDZ</button>
      <nav>
        {user?.role === "admin" && (
          <button className="link" onClick={() => onNavigate("admin")}>Manage books</button>
        )}
        {user ? (
          <>
            <span className="hello">Hi, {user.name} ({user.role})</span>
            <button className="link" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button className="link" onClick={() => onNavigate("login")}>Login</button>
            <button className="link" onClick={() => onNavigate("register")}>Register</button>
          </>
        )}
        <button className="cart-btn" onClick={onCartClick}>🛒 Cart ({count})</button>
      </nav>
    </header>
  );
}

export default Header;
