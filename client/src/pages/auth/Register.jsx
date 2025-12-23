// src/pages/auth/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/ui/Button";
import { toast } from "react-toastify";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { FaGoogle } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import { FiEye, FiEyeOff } from "react-icons/fi";

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

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleGoogleRegister = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
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

      toast.success("Signed up with Google!", {
        style: { background: "#16a34a", color: "#fff" },
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message || "Google sign-up failed");
    } finally {
      setLoading(false);
    }
  };

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
        role: "student",
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
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-[0_18px_40px_rgba(15,23,42,0.12)] px-8 py-8 overflow-hidden">
        {/* Top header gradient */}
        <div className="rounded-2xl bg-gradient-to-r from-[#f59e0b] to-[#f97316] px-6 py-5 mb-6 text-center text-white shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-1">
            Join DNICA EventHub
          </h2>
          <p className="text-xs sm:text-sm text-orange-50">
            Create your student account and start exploring college events and clubs.
          </p>
        </div>

        {/* Heading */}
        <div className="mb-6 text-center">
          <h3 className="text-lg font-semibold text-slate-900">Sign Up as Student</h3>
          <p className="text-xs text-slate-500">
            Fill in your details to create your student account.
          </p>
        </div>

        {/* Google button */}
        <button
          type="button"
          onClick={handleGoogleRegister}
          disabled={loading}
          className="w-full border border-slate-200 rounded-md py-2.5 text-xs sm:text-sm mb-4 flex items-center justify-center gap-2 hover:bg-slate-50 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] font-semibold text-slate-700 border border-slate-200">
            <FaGoogle />
          </span>
          <span>{loading ? "Signing in..." : "Sign up with Google"}</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
            or
          </span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Error */}
        {error && <p className="text-xs text-rose-500 mb-3">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name */}
          <div className="space-y-1 text-sm">
            <label className="text-xs text-slate-500">Full name</label>
            <div className="flex items-center bg-[#f9fafb] border border-slate-200 rounded-md px-3">
              <span className="text-slate-400 mr-2">
                <CiUser />
              </span>
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
              <span className="text-slate-400 mr-2">
                <AiOutlineMail />
              </span>
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
              <span className="text-slate-400 mr-2">
                <FiPhone />
              </span>
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
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-transparent py-2 text-sm outline-none"
                placeholder="Min 6 characters"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-slate-400 text-lg ml-2 hover:text-slate-600"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
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
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full bg-transparent py-2 text-sm outline-none"
                placeholder="Re-enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                className="text-slate-400 text-lg ml-2 hover:text-slate-600"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mt-3 py-2.5 rounded-full bg-gradient-to-r from-[#00a2ff] to-[#007ad9] text-sm font-semibold tracking-wide text-white shadow-[0_10px_25px_rgba(37,99,235,0.35)] hover:from-[#0094f0] hover:to-[#006fd0] disabled:opacity-70 disabled:cursor-not-allowed transition-all"
            disabled={loading}
          >
            {loading
              ? "Creating your account..."
              : "CREATE STUDENT ACCOUNT"}
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
  );
};

export default Register;
