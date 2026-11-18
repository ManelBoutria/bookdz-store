import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const inCart = useSelector((state) =>
    state.cart.items.find((i) => i.id === product._id)
  );

  function handleAdd() {
    dispatch(
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      })
    );
  }

  return (
    <article className="card">
      <img className="card-img" src={product.imageUrl} alt={product.name} />
      <div className="card-body">
        <span className="card-cat">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="card-author">{product.description}</p>
        <p className="card-price">{product.price} DA</p>
        {product.stock === 0 ? (
          <button className="add-btn" disabled>Out of stock</button>
        ) : (
          <button className="add-btn" onClick={handleAdd}>
            {inCart ? `Add another (${inCart.quantity} in cart)` : "Add to cart"}
          </button>
        )}
      </div>
    </article>
  );
}

export default ProductCard;
