// src/components/layout/Sidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkBase =
    "flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-colors";
  const iconBase =
    "flex h-6 w-6 items-center justify-center rounded-lg bg-slate-900 border border-slate-700 text-[11px]";

  return (
    <aside className="hidden md:flex md:flex-col w-60 bg-slate-950/90 border-r border-slate-800/80 backdrop-blur-xl p-4 gap-4">
      {/* Admin header */}
      <div className="flex items-center gap-3 pb-3 border-b border-slate-800/60">
        <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-emerald-400 via-lime-400 to-cyan-400 shadow-lg shadow-emerald-500/40 flex items-center justify-center text-xs font-bold text-slate-900">
          AD
        </div>
        <div className="text-xs">
          <p className="text-slate-200 font-medium leading-tight">
            {user?.name || "Admin"}
          </p>
          <p className="text-emerald-300/90">Club Admin</p>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 flex flex-col gap-1 text-slate-300 text-xs">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/40"
                : "hover:bg-slate-900 hover:text-emerald-200 border border-transparent"
            }`
          }
        >
          <span className={`${iconBase} text-emerald-300`}>📊</span>
          <span>Overview</span>
        </NavLink>

        <NavLink
          to="/admin?section=create"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/40"
                : "hover:bg-slate-900 hover:text-emerald-200 border border-transparent"
            }`
          }
        >
          <span className={`${iconBase} text-emerald-300`}>➕</span>
          <span>Create event</span>
        </NavLink>

        <NavLink
          to="/admin?section=manage"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/40"
                : "hover:bg-slate-900 hover:text-emerald-200 border border-transparent"
            }`
          }
        >
          <span className={`${iconBase} text-emerald-300`}>🗂</span>
          <span>Manage events</span>
        </NavLink>

        <NavLink
          to="/admin?section=analytics"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/40"
                : "hover:bg-slate-900 hover:text-emerald-200 border border-transparent"
            }`
          }
        >
          <span className={`${iconBase} text-emerald-300`}>📈</span>
          <span>Analytics</span>
        </NavLink>
      </nav>

      {/* Bottom buttons */}
      <div className="pt-3 border-t border-slate-800/60 flex flex-col gap-2">
        <NavLink
          to="/"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-emerald-200 hover:bg-slate-900 transition-colors"
        >
          <span className={iconBase}>🏠</span>
          <span>Back to events</span>
        </NavLink>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs border border-slate-700 text-slate-300 hover:border-rose-500 hover:text-rose-300 hover:bg-slate-900 transition-colors"
        >
          <span className={`${iconBase} text-rose-300`}>⎋</span>
          <span>Logout</span>
        </motion.button>
      </div>
    </aside>
  );
};

export default Sidebar;
