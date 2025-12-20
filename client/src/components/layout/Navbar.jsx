// src/components/layout/Navbar.jsx
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `pb-1 border-b-2 ${
      isActive
        ? "border-slate-900 text-slate-900 font-medium"
        : "border-transparent text-slate-500 hover:text-slate-900"
    }`;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      {/* Top bar */}
      <div className="w-full flex items-center justify-between px-4 sm:px-6 lg:px-10 py-4 lg:py-5 gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <div className="flex items-center justify-center h-11 w-11 lg:h-12 lg:w-12 rounded-3xl bg-[#fff7e6] border border-[#ffd591] shadow-sm">
            <span className="text-xl lg:text-2xl font-bold text-[#fa8c16] leading-none">
              C
            </span>
          </div>
          <span className="text-xl lg:text-2xl text-slate-900">
            Campus<span className="text-[#fa8c16]">Connect</span>
          </span>
        </Link>

        {/* Center links: only on large screens */}
        <div className="hidden lg:flex items-center gap-10 text-[17px]">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/events" className={navLinkClass}>
            Events
          </NavLink>
          <NavLink to="/clubs" className={navLinkClass}>
            Clubs
          </NavLink>
          <NavLink to="/my-events" className={navLinkClass}>
            My Participations
          </NavLink>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Bell always visible */}
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f0f5ff] text-[#2f54eb] text-sm">
            🔔
          </button>

          {/* Desktop actions: only on large screens */}
          <div className="hidden lg:flex items-center gap-3 text-xs">
            <button className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-900 text-[17px]">
              <span>More</span>
              <span>▾</span>
            </button>

            <button className="h-10 w-10 items-center justify-center rounded-full bg-[#fff1f0] text-[#fa541c] text-sm">
              ❤
            </button>

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-5 py-3 rounded-full bg-[#f0f5ff] text-[#2f54eb] font-medium hover:bg-[#d6e4ff] transition text-[14px]"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-3 rounded-full border border-slate-300 text-slate-700 font-medium hover:bg-slate-900 hover:text-white transition text-[14px]"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <span className="hidden sm:inline text-[11px] text-slate-500">
                  {user.name} ({user.role})
                </span>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={handleLogout}
                  className="px-5 py-3 rounded-full border border-slate-300 text-[14px] text-slate-700 hover:bg-slate-900 hover:text-white transition"
                >
                  Logout
                </motion.button>
              </>
            )}

            <Link
              to={user?.role === "admin" ? "/admin" : "/login"}
              className="px-5 py-3 rounded-full bg-[#52c41a] text-white font-medium hover:bg-[#389e0d] transition text-[14px]"
            >
              + Host Event
            </Link>
          </div>

          {/* Mobile menu button: visible below lg */}
          <button
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-700"
            onClick={() => setOpen((prev) => !prev)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setOpen(false)}
            />
            {/* Panel */}
            <motion.div
              className="absolute top-0 right-0 h-full w-72 max-w-[80%] bg-white shadow-2xl p-5 flex flex-col gap-5"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-500">
                  Menu
                </span>
                <button
                  className="h-8 w-8 flex items-center justify-center rounded-full border border-slate-300 text-slate-600"
                  onClick={() => setOpen(false)}
                >
                  ✕
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col gap-3 text-sm">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `py-2 border-b ${
                      isActive
                        ? "border-slate-900 text-slate-900 font-semibold"
                        : "border-slate-100 text-slate-600"
                    }`
                  }
                  onClick={() => setOpen(false)}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/events"
                  className={({ isActive }) =>
                    `py-2 border-b ${
                      isActive
                        ? "border-slate-900 text-slate-900 font-semibold"
                        : "border-slate-100 text-slate-600"
                    }`
                  }
                  onClick={() => setOpen(false)}
                >
                  Events
                </NavLink>
                <NavLink
                  to="/clubs"
                  className={({ isActive }) =>
                    `py-2 border-b ${
                      isActive
                        ? "border-slate-900 text-slate-900 font-semibold"
                        : "border-slate-100 text-slate-600"
                    }`
                  }
                  onClick={() => setOpen(false)}
                >
                  Clubs
                </NavLink>
                <NavLink
                  to="/my-events"
                  className={({ isActive }) =>
                    `py-2 border-b ${
                      isActive
                        ? "border-slate-900 text-slate-900 font-semibold"
                        : "border-slate-100 text-slate-600"
                    }`
                  }
                  onClick={() => setOpen(false)}
                >
                  My Participations
                </NavLink>
              </nav>

              {/* Buttons */}
              <div className="mt-4 flex flex-col gap-3">
                {!user ? (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setOpen(false)}
                      className="w-full text-center px-4 py-2.5 rounded-full bg-[#f0f5ff] text-[#2f54eb] font-medium hover:bg-[#d6e4ff] transition text-sm"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setOpen(false)}
                      className="w-full text-center px-4 py-2.5 rounded-full border border-slate-300 text-slate-700 font-medium hover:bg-slate-900 hover:text-white transition text-sm"
                    >
                      Sign up
                    </Link>
                  </>
                ) : (
                  <>
                    <span className="text-[11px] text-slate-500">
                      {user.name} ({user.role})
                    </span>
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={handleLogout}
                      className="w-full px-4 py-2.5 rounded-full border border-slate-300 text-sm text-slate-700 hover:bg-slate-900 hover:text-white transition"
                    >
                      Logout
                    </motion.button>
                  </>
                )}

                <Link
                  to={user?.role === "admin" ? "/admin" : "/login"}
                  onClick={() => setOpen(false)}
                  className="w-full text-center px-4 py-2.5 rounded-full bg-[#52c41a] text-white font-medium hover:bg-[#389e0d] transition text-sm"
                >
                  + Host Event
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
