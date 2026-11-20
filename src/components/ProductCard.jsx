import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import BookCover from "./BookCover";

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
        category: product.category,
      })
    );
  }

  return (
    <article className="card">
      <BookCover book={product} className="card-img" />
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
