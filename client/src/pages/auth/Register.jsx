import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post(
        "/api/auth/register",
        form
      );
      login(data);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to register"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold mb-2">
          Join CampusConnect
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          One place for all your college events.
        </p>

        {error && (
          <p className="text-xs text-rose-400 mb-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-slate-400">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-900/80 border border-slate-600/60 px-3 py-2 text-sm outline-none focus:border-sky-500 transition-colors"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-400">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-900/80 border border-slate-600/60 px-3 py-2 text-sm outline-none focus:border-sky-500 transition-colors"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-400">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-900/80 border border-slate-600/60 px-3 py-2 text-sm outline-none focus:border-sky-500 transition-colors"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-400">
              Role
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-900/80 border border-slate-600/60 px-3 py-2 text-sm outline-none focus:border-sky-500 transition-colors"
            >
              <option value="student">Student</option>
              <option value="admin">Club Admin</option>
            </select>
          </div>

          <Button
            type="submit"
            className="w-full mt-2 py-2"
            disabled={loading}
          >
            {loading ? "Creating your account..." : "Register"}
          </Button>
        </form>

        <p className="mt-4 text-xs text-slate-400 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-sky-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Register;
