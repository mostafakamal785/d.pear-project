import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../lib/auth";
import toast from "react-hot-toast";
import Logo from "../components/Logo";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [isLoading, setIsLoading] = useState(false);
  // حالة جديدة لتخزين أخطاء التحقق لكل حقل
  const [errors, setErrors] = useState({}); 
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    // التحقق من الاسم
    if (!form.name.trim()) {
      newErrors.name = "Full Name is required.";
    }
    // التحقق من البريد الإلكتروني باستخدام تعبير نمطي (Regex)
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email address is invalid.";
    }
    // التحقق من طول كلمة المرور
    if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }
    // التحقق من تطابق كلمتي المرور
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(newErrors);
    // إرجاع true إذا لم يكن هناك أخطاء
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // استدعاء دالة التحقق قبل الإرسال
    if (!validateForm()) {
      return; // إيقاف الإرسال إذا كانت هناك أخطاء
    }
    if (isLoading) return;

    setIsLoading(true);
    setTimeout(() => {
      try {
        // تمرير البيانات بدون confirmPassword
        const { name, email, password } = form;
        registerUser({ name, email, password });
        toast.success("Account created successfully!");
        navigate("/");
      } catch (err) {
        toast.error(err.message || "Registration failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // إزالة رسالة الخطأ عند بدء المستخدم في الكتابة
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <Logo />
          </Link>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-bold mb-2 text-center text-slate-800">Create Your Account</h1>
          <p className="text-center text-slate-500 mb-6">Join our community and start learning today.</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-600 mb-1">Full Name</label>
              <input 
                id="name" 
                name="name" 
                type="text" 
                value={form.name} 
                onChange={handleChange} 
                className={`input w-full h-11 ${errors.name ? 'border-red-500' : ''}`} // تغيير لون الحقل عند الخطأ
                placeholder="e.g., John Doe" 
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-600 mb-1">Email Address</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                value={form.email} 
                onChange={handleChange} 
                className={`input w-full h-11 ${errors.email ? 'border-red-500' : ''}`}
                placeholder="you@example.com" 
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-600 mb-1">Password</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                value={form.password} 
                onChange={handleChange} 
                className={`input w-full h-11 ${errors.password ? 'border-red-500' : ''}`}
                placeholder="Minimum 8 characters" 
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            {/* إضافة حقل تأكيد كلمة المرور */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-600 mb-1">Confirm Password</label>
              <input 
                id="confirmPassword" 
                name="confirmPassword" 
                type="password" 
                value={form.confirmPassword} 
                onChange={handleChange} 
                className={`input w-full h-11 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                placeholder="Repeat your password" 
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
            <button 
              type="submit" 
              className="btn-primary w-full h-12 text-base shadow-lg hover:shadow-xl transition" 
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
