import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/ui/Button";
import { toast } from "react-toastify";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-8 bg-slate-50">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-[0_18px_40px_rgba(15,23,42,0.12)] overflow-hidden flex">
        {/* Left orange welcome panel */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-r from-[#f59e0b] to-[#f97316] items-center justify-center">
          <h2 className="text-3xl font-semibold text-white">Welcome Back!</h2>
        </div>

        {/* Right login panel */}
        <div className="w-full md:w-1/2 px-8 py-10">
          <h2 className="text-3xl font-semibold text-[#f59e0b] mb-1">Login</h2>
          <p className="text-sm text-slate-500 mb-6">Sign in to your account</p>

          {error && <p className="text-xs text-rose-500 mb-3">{error}</p>}

          {/* Simple Google placeholder button (optional) */}
          <button
            type="button"
            className="w-full border border-slate-200 rounded-md py-2.5 text-xs sm:text-sm mb-4 flex items-center justify-center gap-2 hover:bg-slate-50"
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] font-semibold text-slate-700 border border-slate-200">
              G
            </span>
            <span>Sign in with Google</span>
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
              or
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1 text-sm">
              <label className="text-xs text-slate-500">Email</label>
              <div className="flex items-center bg-[#f9fafb] border border-slate-200 rounded-md px-3">
                <span className="text-slate-400 mr-2">📧</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-transparent py-2 text-sm outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1 text-sm">
              <label className="text-xs text-slate-500">Password</label>
              <div className="flex items-center bg-[#f9fafb] border border-slate-200 rounded-md px-3">
                <span className="text-slate-400 mr-2">•••</span>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full bg-transparent py-2 text-sm outline-none"
                  placeholder="Enter password"
                  required
                />
                <span className="text-slate-400 text-xs ml-2">👁</span>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-2 py-2 bg-[#f59e0b] hover:bg-[#ea580c]"
              disabled={loading}
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
        </div>
      </div>
    </div>
  );
};

export default Login;
