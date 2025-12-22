// src/pages/auth/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/ui/Button";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { TbLockPassword } from "react-icons/tb";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/api/auth/login", form);
      login(data);
      toast.success("Logged in successfully!", {
        style: { background: "#16a34a", color: "#fff" },
      });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  // Google login using only Firebase
  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken();

      // Adapt this object to match what your AuthContext.login expects
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
      navigate("/profile");
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
        {/* Top welcome section with gradient */}
        <div className="rounded-2xl bg-gradient-to-r from-[#f59e0b] to-[#f97316] px-6 py-6 mb-8 text-center text-white shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-1">
            Welcome Back!
          </h2>
          <p className="text-xs sm:text-sm text-orange-50">
            Sign in to your account to manage and explore events.
          </p>
        </div>

        {/* Heading */}
        <div className="mb-4 text-center">
          <h3 className="text-lg font-semibold text-slate-900">Login</h3>
          <p className="text-xs text-slate-500">Use your email and password</p>
        </div>

        {error && (
          <p className="text-xs text-rose-500 mb-3 text-center">{error}</p>
        )}

        {/* Google button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full border border-slate-200 rounded-md py-2.5 text-xs sm:text-sm mb-4 flex items-center justify-center gap-2 hover:bg-slate-50 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] font-semibold text-slate-700 border border-slate-200">
            <FaGoogle />
          </span>
          <span>{loading ? "Signing in..." : "Sign in with Google"}</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
            or
          </span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-1 text-sm">
            <label className="text-xs text-slate-500">Email</label>
            <div className="flex items-center bg-[#f9fafb] border border-slate-200 rounded-md px-3">
              <span className="text-slate-400 mr-2">
                <AiOutlineMail />
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-transparent py-2 text-sm outline-none px-3"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1 text-sm">
            <label className="text-xs text-slate-500">Password</label>
            <div className="flex items-center bg-[#f9fafb] border border-slate-200 rounded-md px-3">
              <span className="text-slate-400 mr-2">
                <TbLockPassword />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-transparent py-2 text-sm outline-none px-3"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-slate-400 text-xs ml-2 flex items-center justify-center"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-2.5 rounded-full bg-gradient-to-r from-[#00a2ff] to-[#007ad9] text-sm font-semibold tracking-wide text-white shadow-[0_10px_25px_rgba(37,99,235,0.35)] hover:from-[#0094f0] hover:to-[#006fd0] disabled:opacity-70 disabled:cursor-not-allowed transition-all"
          >
            {loading ? "Signing you in..." : "LOGIN"}
          </Button>
        </form>

        <p className="mt-5 text-xs text-slate-500 text-center">
          New User?{" "}
          <Link
            to="/register"
            className="text-[#f59e0b] font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
