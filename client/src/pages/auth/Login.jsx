// src/pages/auth/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { ADMIN_CREDENTIALS } from "../../utils/adminConfig";
import Button from "../../components/ui/Button";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { TbLockPassword } from "react-icons/tb";
import { FaGoogle } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import api from "../../api/axios";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ FIXED: ADMIN AUTO-REDIRECTS TO DASHBOARD
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      // ADMIN LOGIN - DIRECT TO ADMIN DASHBOARD
      if (form.email === ADMIN_CREDENTIALS.email && form.password === ADMIN_CREDENTIALS.password) {
        const adminData = {
          token: "admin-token",
          ...ADMIN_CREDENTIALS
        };
        login(adminData);
        toast.success("Admin logged in successfully! 👑", {
          style: { background: "#f59e0b", color: "#fff" },
        });
        navigate("/admin"); // ← ADMIN DASHBOARD
        return;
      }

      // STUDENT LOGIN - Go to home
      const { data } = await api.post("/api/auth/login", form);
      login(data);
      
      toast.success("Logged in successfully!", {
        style: { background: "#16a34a", color: "#fff" },
      });
      navigate("/"); // ← STUDENT HOME
    } catch (err) {
      setError(err.response?.data?.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  // Google login (students only)
  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Block admin email from Google
      if (user.email === ADMIN_CREDENTIALS.email) {
        setError("Login failed. Please try again.");
        setLoading(false);
        return;
      }

      const idToken = await user.getIdToken();
      login({
        token: idToken,
        user: {
          id: user.uid,
          name: user.displayName || "Google User",
          email: user.email,
          role: "student",
        },
      });

      toast.success("Logged in with Google!", {
        style: { background: "#16a34a", color: "#fff" },
      });
      navigate("/"); // Students go home
    } catch (err) {
      console.error(err);
      setError(err.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-[0_18px_40px_rgba(15,23,42,0.12)] overflow-hidden px-8 py-9"
      >
        {/* Top welcome section */}
        <div className="rounded-2xl bg-gradient-to-r from-[#f59e0b] to-[#f97316] px-6 py-6 mb-8 text-center text-white shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-1">Welcome Back!</h2>
          <p className="text-xs sm:text-sm text-orange-50">
            Sign in to your account to manage and explore events
          </p>
        </div>

        <div className="mb-6 text-center">
          <h3 className="text-lg font-semibold text-slate-900">Login</h3>
          <p className="text-xs text-slate-500">Enter your email and password</p>
        </div>

        {error && <p className="text-xs text-rose-500 mb-4 text-center">{error}</p>}

        {/* Google button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full border border-slate-200 rounded-md py-2.5 px-4 text-sm mb-4 flex items-center justify-center gap-3 hover:bg-slate-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed h-12"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm border">
            <FaGoogle className="text-sm" />
          </span>
          <span>{loading ? "Signing in..." : "Continue with Google"}</span>
        </button>

        {/* Divider */}
        <div className="relative flex items-center mb-6">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="px-3 text-xs text-slate-400 uppercase tracking-wide">or</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* SINGLE FORM - Admin & Students */}
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Email address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AiOutlineMail className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-sm placeholder-slate-400 focus:ring-2 focus:ring-[#00a2ff] focus:border-transparent transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <TbLockPassword className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-xl bg-slate-50 text-sm placeholder-slate-400 focus:ring-2 focus:ring-[#00a2ff] focus:border-transparent transition-all"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <FiEyeOff className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                ) : (
                  <FiEye className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 px-6 rounded-xl bg-gradient-to-r from-[#00a2ff] to-[#007ad9] hover:from-[#0094f0] hover:to-[#006fd0] text-sm font-semibold tracking-wide text-white shadow-lg hover:shadow-xl focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Signing you in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-500">
            Don't have an account?{" "}
            <Link 
              to="/register" 
              className="font-medium text-[#f59e0b] hover:text-[#f97316] transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
