import { useState } from "react";
import { useDispatch } from "react-redux";
import { api } from "../api";
import { loginSuccess } from "../redux/authSlice";

// One form used for both Login and Register
function AuthForm({ mode, onNavigate }) {
  const dispatch = useDispatch();
  const isRegister = mode === "register";
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isRegister) {
        await api("/auth/register", { method: "POST", body: form });
      }
      const data = await api("/auth/login", {
        method: "POST",
        body: { email: form.email, password: form.password },
      });
      dispatch(loginSuccess({ token: data.token, user: data.user }));
      onNavigate(data.user.role === "admin" ? "admin" : "shop");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2>{isRegister ? "Create an account" : "Login"}</h2>
        {isRegister && (
          <input name="name" placeholder="Full name" value={form.name} onChange={change} required />
        )}
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={change} required />
        <input name="password" type="password" placeholder="Password (min 6 characters)" value={form.password} onChange={change} required />
        {error && <p className="error">{error}</p>}
        <button className="add-btn" disabled={loading}>
          {loading ? "Please wait..." : isRegister ? "Register" : "Login"}
        </button>
        <p className="switch">
          {isRegister ? "Already have an account? " : "New here? "}
          <button type="button" onClick={() => onNavigate(isRegister ? "login" : "register")}>
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </form>
    </section>
  );
}

export default AuthForm;
