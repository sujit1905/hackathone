import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const Navbar = ({ theme, toggleTheme }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="backdrop-blur-xl bg-slate-950/80 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo + brand */}
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          {/* CC logo pill */}
          <div className="flex items-center justify-center h-9 w-9 rounded-2xl bg-slate-900 border border-emerald-400/60 shadow-lg shadow-emerald-500/40">
            <span className="text-[15px] font-bold leading-none text-emerald-300">
              CC
            </span>
          </div>

          <span className="text-lg">
            Campus<span className="text-emerald-400">Connect</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-4 text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-1 rounded-full transition-colors ${
                isActive
                  ? "bg-emerald-500/15 text-emerald-300"
                  : "text-slate-300 hover:text-emerald-200"
              }`
            }
          >
            Events
          </NavLink>

          {user && (
            <NavLink
              to="/my-events"
              className={({ isActive }) =>
                `px-3 py-1 rounded-full transition-colors ${
                  isActive
                    ? "bg-emerald-500/15 text-emerald-300"
                    : "text-slate-300 hover:text-emerald-200"
                }`
              }
            >
              My Events
            </NavLink>
          )}

          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `px-3 py-1 rounded-full transition-colors ${
                  isActive
                    ? "bg-emerald-500/15 text-emerald-300"
                    : "text-slate-300 hover:text-emerald-200"
                }`
              }
            >
              Dashboard
            </NavLink>
          )}

          {/* theme toggle */}
          <button
            onClick={toggleTheme}
            className="h-8 w-8 rounded-full border border-slate-700 flex items-center justify-center text-xs text-slate-300 hover:border-emerald-400 hover:text-emerald-300 transition-colors"
          >
            {theme === "dark" ? "☾" : "☀"}
          </button>

          {/* auth controls */}
          {!user ? (
            <div className="flex gap-2">
              <NavLink
                to="/login"
                className="px-3 py-1 text-slate-200 text-sm hover:text-emerald-200"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-3 py-1 rounded-full bg-emerald-500 text-slate-900 text-sm font-medium shadow-lg shadow-emerald-500/40 hover:bg-emerald-400 transition"
              >
                Join
              </NavLink>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 hidden sm:block">
                {user.name} ({user.role})
              </span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="px-3 py-1 rounded-full border border-slate-700 text-xs text-slate-300 hover:border-rose-500 hover:text-rose-300 transition"
              >
                Logout
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
