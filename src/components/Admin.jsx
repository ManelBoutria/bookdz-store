import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../api";

const empty = { name: "", description: "", price: "", category: "Novels", imageUrl: "", stock: "" };

// Admin / seller page: add, edit and delete books
function Admin() {
  const { token, user } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const load = () => api("/products").then(setProducts).catch((e) => setError(e.message));
  useEffect(() => { load(); }, []);

  if (user?.role !== "admin") {
    return <p className="empty error">Admins only. Please login as admin.</p>;
  }

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const body = { ...form, price: Number(form.price), stock: Number(form.stock || 0) };
    try {
      if (editingId) {
        await api(`/products/${editingId}`, { method: "PUT", body, token });
      } else {
        await api("/products", { method: "POST", body, token });
      }
      setForm(empty);
      setEditingId(null);
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  function startEdit(p) {
    setEditingId(p._id);
    setForm({
      name: p.name, description: p.description || "", price: p.price,
      category: p.category, imageUrl: p.imageUrl || "", stock: p.stock,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this book?")) return;
    try {
      await api(`/products/${id}`, { method: "DELETE", token });
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="shop admin">
      <h2>Manage books</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Title" value={form.name} onChange={change} required />
        <input name="description" placeholder="Description" value={form.description} onChange={change} />
        <input name="price" type="number" min="0" placeholder="Price (DA)" value={form.price} onChange={change} required />
        <select name="category" value={form.category} onChange={change}>
          {["Novels", "Tech", "Kids", "Self-help"].map((c) => <option key={c}>{c}</option>)}
        </select>
        <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={change} />
        <input name="stock" type="number" min="0" placeholder="Stock" value={form.stock} onChange={change} />
        <button className="add-btn">{editingId ? "Save changes" : "Add book"}</button>
        {editingId && (
          <button type="button" className="add-btn secondary" onClick={() => { setEditingId(null); setForm(empty); }}>
            Cancel
          </button>
        )}
      </form>
      {error && <p className="error">{error}</p>}

      <div className="admin-list">
        {products.map((p) => (
          <div className="admin-row" key={p._id}>
            <img src={p.imageUrl} alt={p.name} />
            <div className="admin-info">
              <strong>{p.name}</strong>
              <small>{p.category} · {p.price} DA · stock {p.stock}</small>
            </div>
            <button className="chip" onClick={() => startEdit(p)}>Edit</button>
            <button className="chip danger" onClick={() => handleDelete(p._id)}>Delete</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Admin;
