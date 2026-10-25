import { useState } from "react";
import ProductCard from "./ProductCard";
import products from "../data/products";

const categories = ["All", "Novels", "Tech", "Kids", "Self-help"];

function ProductList() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

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

      {visible.length === 0 ? (
        <p className="empty">No books found.</p>
      ) : (
        <div className="grid">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductList;
