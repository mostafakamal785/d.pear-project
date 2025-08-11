import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../lib/auth";
import toast from "react-hot-toast"; // استيراد toast

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false); // حالة التحميل
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    // استخدام setTimeout لمحاكاة طلب الشبكة
    setTimeout(() => {
      try {
        loginUser(form);
        toast.success("Logged in successfully!"); // إشعار النجاح
        navigate("/");
      } catch (err) {
        toast.error(err.message || "Login failed."); // إشعار الخطأ
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section className="container-x py-12 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email">Email Address</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className="input" placeholder="you@example.com" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value={form.password} onChange={handleChange} className="input" placeholder="********" required />
        </div>
        <button type="submit" className="btn-primary w-full h-11 flex items-center justify-center" disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </section>
  );
}
