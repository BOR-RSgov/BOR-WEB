import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(form));
    if (login.fulfilled.match(result)) {
      toast.success("Welcome back");
      navigate("/");
    } else {
      toast.error(result.payload || "Login failed");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <form onSubmit={handleSubmit} className="card-surface p-4" style={{ width: 380 }}>
        <h4 className="fw-bold mb-1" style={{ color: "var(--primary)" }}>BOR CMS</h4>
        <p className="text-muted-brand mb-4" style={{ fontSize: 14 }}>Sign in to manage the website</p>

        <label className="form-label">Email</label>
        <input
          type="email" required className="form-control mb-3"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <label className="form-label">Password</label>
        <input
          type="password" required className="form-control mb-4"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit" disabled={status === "loading"} className="btn btn-brand w-100">
          {status === "loading" ? "Signing in..." : "Sign In"}
        </button>
        {error && <p className="text-danger mt-3 mb-0" style={{ fontSize: 13 }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;