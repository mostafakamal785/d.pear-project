import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../lib/auth";
import toast from "react-hot-toast";
import Logo from "../components/Logo"; // استيراد الشعار

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setTimeout(() => {
      try {
        loginUser(form);
        toast.success("Logged in successfully!");
        navigate("/");
      } catch (err) {
        toast.error(err.message || "Login failed.");
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    // 1. إضافة خلفية متدرجة وتوسيط المحتوى
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <Logo />
          </Link>
        </div>
        
        {/* 2. وضع النموذج داخل بطاقة بتصميم حديث */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-bold mb-2 text-center text-slate-800">Welcome Back!</h1>
          <p className="text-center text-slate-500 mb-6">Login to continue your learning journey.</p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-600 mb-1">Email Address</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                value={form.email} 
                onChange={handleChange} 
                className="input w-full h-11" // استخدام تنسيق موحد
                placeholder="you@example.com" 
                required 
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-600 mb-1">Password</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                value={form.password} 
                onChange={handleChange} 
                className="input w-full h-11" 
                placeholder="********" 
                required 
              />
            </div>
            <button 
              type="submit" 
              className="btn-primary w-full h-12 text-base shadow-lg hover:shadow-xl transition" 
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>

        {/* 3. إضافة رابط لإنشاء حساب جديد */}
        <p className="text-center mt-6 text-sm text-slate-600">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-indigo-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
