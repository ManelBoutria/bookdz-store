import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookCover from "./BookCover";
import { increase, decrease, removeFromCart, clearCart } from "../redux/cartSlice";

function Cart({ open, onClose, onNavigate }) {
  const items = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [done, setDone] = useState(false);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (!open) return null;

  function handleClose() {
    setDone(false);
    onClose();
  }

  // Demo checkout: only a logged-in customer can buy
  function handleCheckout() {
    if (!user) {
      handleClose();
      onNavigate("login");
      return;
    }
    dispatch(clearCart());
    setDone(true);
  }

  return (
    <>
      <div className="overlay" onClick={handleClose}></div>
      <aside className="drawer">
        <div className="drawer-head">
          <h2>Your Cart</h2>
          <button className="close" onClick={handleClose}>✕</button>
        </div>

        {done && <p className="success">Thank you! Your order was placed (demo).</p>}

        {items.length === 0 ? (
          !done && <p className="empty">Your cart is empty.</p>
        ) : (
          <>
            <div className="items">
              {items.map((i) => (
                <div className="item" key={i.id}>
                  <BookCover book={i} className="item-img" />
                  <div className="item-info">
                    <strong>{i.name}</strong>
                    <br />
                    <small>{i.price} DA</small>
                  </div>
                  <div className="qty">
                    <button onClick={() => dispatch(decrease(i.id))}>-</button>
                    <span>{i.quantity}</span>
                    <button onClick={() => dispatch(increase(i.id))}>+</button>
                  </div>
                  <button className="remove" onClick={() => dispatch(removeFromCart(i.id))}>
                    🗑
                  </button>
                </div>
              ))}
            </div>

            <div className="total">
              <span>Total</span>
              <span>{total} DA</span>
            </div>
            <button className="add-btn" onClick={handleCheckout}>
              {user ? "Checkout" : "Login to checkout"}
            </button>
            <button className="add-btn secondary" onClick={() => dispatch(clearCart())}>
              Clear cart
            </button>
          </>
        )}
      </aside>
    </>
  );
}

export default Cart;
