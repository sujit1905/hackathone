// src/pages/auth/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/ui/Button";
import { toast } from "react-toastify";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRoleChange = (role) => setForm((prev) => ({ ...prev, role }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post("/api/auth/register", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: form.role,
      });
      login(data);
      toast.success("Account created successfully!", {
        style: { background: "#16a34a", color: "#fff" },
      });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-8 bg-slate-50">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-[0_18px_40px_rgba(15,23,42,0.12)] overflow-hidden flex">
        {/* Left orange join panel */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-r from-[#f59e0b] to-[#f97316] items-center justify-center">
          <h2 className="text-3xl font-semibold text-white text-center">
            Join DNICA EventHub
          </h2>
        </div>

        {/* Right signup panel */}
        <div className="w-full md:w-1/2 px-8 py-10">
          <h2 className="text-3xl font-semibold text-[#f59e0b] mb-1">
            Sign Up
          </h2>
          <p className="text-sm text-slate-500 mb-6 max-w-xs">
            Choose your account type and create your profile.
          </p>

          {/* Role tabs */}
          <div className="flex mb-4 text-sm">
            <button
              type="button"
              onClick={() => handleRoleChange("student")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-l-md border ${
                form.role === "student"
                  ? "bg-[#f97316]/10 border-[#f97316] text-[#f97316] font-medium"
                  : "bg-slate-50 border-slate-200 text-slate-500"
              }`}
            >
              <span>🎓</span>
              <span>Student</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange("admin")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-r-md border-t border-r border-b ${
                form.role === "admin"
                  ? "bg-[#f97316]/10 border-[#f97316] text-[#f97316] font-medium"
                  : "bg-slate-50 border-slate-200 text-slate-500"
              }`}
            >
              <span>🏫</span>
              <span>Club</span>
            </button>
          </div>

          {/* Optional Google button */}
          <button
            type="button"
            className="w-full border border-slate-200 rounded-md py-2.5 text-xs sm:text-sm mb-4 flex items-center justify-center gap-2 hover:bg-slate-50"
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] font-semibold text-slate-700 border border-slate-200">
              G
            </span>
            <span>Sign up with Google</span>
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
              or
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Quick registration info */}
          <div className="mb-4 rounded-md bg-[#eff6ff] px-3 py-2">
            <p className="text-[11px] text-slate-600">
              <span className="font-semibold">Quick Registration:</span> Get
              started with just your basic details. You can complete your
              academic profile later from your dashboard.
            </p>
          </div>

          {error && <p className="text-xs text-rose-500 mb-3">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name */}
            <div className="space-y-1 text-sm">
              <label className="text-xs text-slate-500">Full name</label>
              <div className="flex items-center bg-[#f9fafb] border border-slate-200 rounded-md px-3">
                <span className="text-slate-400 mr-2">👤</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-transparent py-2 text-sm outline-none"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1 text-sm">
              <label className="text-xs text-slate-500">Email address</label>
              <div className="flex items-center bg-[#f9fafb] border border-slate-200 rounded-md px-3">
                <span className="text-slate-400 mr-2">📧</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-transparent py-2 text-sm outline-none"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1 text-sm">
              <label className="text-xs text-slate-500">Mobile number</label>
              <div className="flex items-center bg-[#f9fafb] border border-slate-200 rounded-md px-3">
                <span className="text-slate-400 mr-2">📱</span>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent py-2 text-sm outline-none"
                  placeholder="Enter your mobile number"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1 text-sm">
              <label className="text-xs text-slate-500">
                Create a strong password
              </label>
              <div className="flex items-center bg-[#f9fafb] border border-slate-200 rounded-md px-3">
                <span className="text-slate-400 mr-2">•••</span>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full bg-transparent py-2 text-sm outline-none"
                  placeholder="Min 6 characters"
                  required
                />
                <span className="text-slate-400 text-xs ml-2">👁</span>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1 text-sm">
              <label className="text-xs text-slate-500">
                Confirm your password
              </label>
              <div className="flex items-center bg-[#f9fafb] border border-slate-200 rounded-md px-3">
                <span className="text-slate-400 mr-2">•••</span>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-transparent py-2 text-sm outline-none"
                  placeholder="Re-enter password"
                  required
                />
                <span className="text-slate-400 text-xs ml-2">👁</span>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-3 py-2 bg-[#f59e0b] hover:bg-[#ea580c]"
              disabled={loading}
            >
              {loading
                ? "Creating your account..."
                : form.role === "student"
                ? "CREATE STUDENT ACCOUNT"
                : "CREATE CLUB ACCOUNT"}
            </Button>
          </form>

          <p className="mt-5 text-xs text-slate-500 text-center">
            Have account?{" "}
            <Link
              to="/login"
              className="text-[#f59e0b] font-medium hover:underline"
            >
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
