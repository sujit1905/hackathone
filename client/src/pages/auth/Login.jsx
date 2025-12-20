import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const inputVariants = {
  focus: { scale: 1.02, borderColor: "#38bdf8" },
  blur: { scale: 1, borderColor: "rgba(148,163,184,0.4)" },
};

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
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to login"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold mb-2">
          Welcome back
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          Sign in to discover and register for campus events.
        </p>

        {error && (
          <p className="text-xs text-rose-400 mb-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {["email", "password"].map((field) => (
            <motion.div
              key={field}
              variants={inputVariants}
              initial="blur"
              whileFocus="focus"
              className="space-y-1"
            >
              <label className="text-xs text-slate-400">
                {field === "email" ? "Email" : "Password"}
              </label>
              <motion.input
                type={field}
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="w-full rounded-xl bg-slate-900/80 border border-slate-600/60 px-3 py-2 text-sm outline-none focus:border-sky-500 transition-colors"
                whileFocus={{ borderColor: "#38bdf8" }}
              />
            </motion.div>
          ))}

          <Button
            type="submit"
            className="w-full mt-2 py-2"
            disabled={loading}
          >
            {loading ? "Signing you in..." : "Login"}
          </Button>
        </form>

        <p className="mt-4 text-xs text-slate-400 text-center">
          New here?{" "}
          <Link
            to="/register"
            className="text-sky-400 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;
