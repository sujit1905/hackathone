// src/components/layout/Navbar.jsx
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { CiHeart, CiBellOn } from "react-icons/ci";
import { toast } from "react-toastify";
import { FaAngleDown } from "react-icons/fa6";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!", {
      style: { background: "#16a34a", color: "#fff" },
    });
    navigate("/");
    setOpen(false);
  };

  // Handle My Participations click - show message if not logged in
  const handleMyEventsClick = (e) => {
    if (!user) {
      e.preventDefault();
      toast.info("Please log in first to see your participations!", {
        style: { 
          background: "linear-gradient(135deg, #3b82f6, #1d4ed8)", 
          color: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(59, 130, 246, 0.3)"
        },
      });
      return false;
    }
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
          <span className="text-xl lg:text-2xl text-slate-900">
            CLG<span className="text-[#fa8c16]">EventHub</span>
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
          <NavLink 
            to="/my-events" 
            className={navLinkClass}
            onClick={handleMyEventsClick}
          >
            My Participations
          </NavLink>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Desktop actions: only on large screens */}
          <div className="hidden lg:flex items-center gap-3 text-xs relative">
            {/* More dropdown trigger */}
            <div className="relative">
              <button
                onClick={() => setShowMore((prev) => !prev)}
                className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-900 text-[17px]"
              >
                <span>More</span>
                <span className="text-xs">
                  <FaAngleDown
                    className={`transition-transform ${
                      showMore ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </button>

              <AnimatePresence>
                {showMore && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-3 w-40 bg-white rounded-xl shadow-[0_16px_40px_rgba(15,23,42,0.16)] border border-slate-100 overflow-hidden z-40"
                  >
                    <Link
                      to="/about"
                      onClick={() => setShowMore(false)}
                      className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      About Us
                    </Link>
                    <Link
                      to="/contact"
                      onClick={() => setShowMore(false)}
                      className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Contact Us
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bell with dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications((prev) => !prev)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f0f5ff] text-[#2f54eb] text-xl"
              >
                <CiBellOn />
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-[0_18px_40px_rgba(15,23,42,0.16)] border border-slate-100 overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/60">
                      <p className="text-sm font-semibold text-slate-800">
                        Notifications
                      </p>
                    </div>
                    <div className="px-4 py-6 text-center">
                      <div className="mb-3 text-3xl text-slate-300 flex justify-center">
                        <CiBellOn />
                      </div>
                      <p className="text-sm font-medium text-slate-700">
                        No new notifications
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        We'll notify you when there's something new.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="w-full py-2.5 text-sm text-slate-600 border-t border-slate-100 hover:bg-slate-50"
                    >
                      Close
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist heart */}
            <button
              onClick={() => navigate("/wishlist")}
              className="h-10 w-10 flex items-center justify-center rounded-full bg-[#fff1f0] text-[#fa541c] text-xl"
            >
              <CiHeart />
            </button>

            {/* Profile + auth buttons */}
            {user ? (
              <>
                {/* Profile button */}
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white text-[14px] text-slate-700 hover:bg-slate-50"
                >
                  <span className="h-7 w-7 rounded-full bg-[#fff7e6] flex items-center justify-center text-[11px] font-semibold text-slate-900">
                    {user.name?.[0]?.toUpperCase() || "U"}
                  </span>
                  <span>Profile</span>
                </Link>

                {/* ADMIN PANEL BUTTON - VISIBLE ONLY FOR ADMIN */}
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="px-5 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-[14px] shadow-lg hover:shadow-xl transition-all"
                  >
                    👑 Admin
                  </Link>
                )}

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={handleLogout}
                  className="px-5 py-3 rounded-full border border-slate-300 text-[14px] text-slate-700 hover:bg-slate-900 hover:text-white transition"
                >
                  Logout
                </motion.button>
              </>
            ) : (
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
            )}
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
                  to="/my-events"
                  className={({ isActive }) =>
                    `py-2 border-b ${
                      isActive
                        ? "border-slate-900 text-slate-900 font-semibold"
                        : "border-slate-100 text-slate-600"
                    }`
                  }
                  onClick={(e) => {
                    setOpen(false);
                    handleMyEventsClick(e);
                  }}
                >
                  My Participations
                </NavLink>

                {/* Profile link on mobile when logged in */}
                {user && (
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `py-2 border-b ${
                        isActive
                          ? "border-slate-900 text-slate-900 font-semibold"
                          : "border-slate-100 text-slate-600"
                      }`
                    }
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </NavLink>
                )}

                {/* ADMIN LINK IN MOBILE MENU */}
                {user?.role === "admin" && (
                  <NavLink
                    to="/admin"
                    className="py-2 border-b border-slate-100 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl px-4 py-3 text-center shadow-lg"
                    onClick={() => setOpen(false)}
                  >
                    👑 Admin Panel
                  </NavLink>
                )}

                {/* More items in mobile */}
                <NavLink
                  to="/about"
                  className="py-2 border-b border-slate-100 text-slate-600"
                  onClick={() => setOpen(false)}
                >
                  About Us
                </NavLink>
                <NavLink
                  to="/contact"
                  className="py-2 border-b border-slate-100 text-slate-600"
                  onClick={() => setOpen(false)}
                >
                  Contact Us
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
