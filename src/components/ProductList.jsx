import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { api } from "../api";

const categories = ["All", "Novels", "Tech", "Kids", "Self-help"];

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  // Load the books from the backend once
  useEffect(() => {
    api("/products")
      .then(setProducts)
      .catch(() => setError("Could not load books. Is the backend running?"))
      .finally(() => setLoading(false));
  }, []);

  const visible = products.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="shop" id="shop">
      <h2>Our Books</h2>

      <div className="tools">
        <input
          type="text"
          placeholder="Search a book..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {categories.map((c) => (
          <button
            key={c}
            className={c === category ? "chip active" : "chip"}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {loading && <p className="empty">Loading books...</p>}
      {error && <p className="empty error">{error}</p>}
      {!loading && !error && visible.length === 0 && (
        <p className="empty">No books found.</p>
      )}
      <div className="grid">
        {visible.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </section>
  );
}

export default ProductList;
