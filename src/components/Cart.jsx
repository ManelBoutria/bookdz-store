import { useDispatch, useSelector } from "react-redux";
import { increase, decrease, removeFromCart, clearCart } from "../redux/cartSlice";

function Cart({ open, onClose }) {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (!open) return null;

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <aside className="drawer">
        <div className="drawer-head">
          <h2>Your Cart</h2>
          <button className="close" onClick={onClose}>✕</button>
        </div>

        {items.length === 0 ? (
          <p className="empty">Your cart is empty.</p>
        ) : (
          <>
            <div className="items">
              {items.map((i) => (
                <div className="item" key={i.id}>
                  <span className="item-emoji">{i.emoji}</span>
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
            <button className="add-btn" onClick={() => dispatch(clearCart())}>
              Clear cart
            </button>
          </>
        )}
      </aside>
    </>
  );
}

export default Cart;
