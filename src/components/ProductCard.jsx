import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const inCart = useSelector((state) =>
    state.cart.items.find((i) => i.id === product.id)
  );

  return (
    <article className="card">
      <div className="card-img" style={{ background: product.tint }}>
        {product.emoji}
      </div>
      <div className="card-body">
        <span className="card-cat">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="card-author">by {product.author}</p>
        <p className="card-price">{product.price} DA</p>
        <button className="add-btn" onClick={() => dispatch(addToCart(product))}>
          {inCart ? `Add another (${inCart.quantity} in cart)` : "Add to cart"}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
