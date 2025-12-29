import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FiHome,
  FiCalendar,
  FiLogOut,
  FiPlusSquare,
  FiChevronLeft,
  FiUser,
  FiMenu,
} from "react-icons/fi";

const AdminLayout = ({ children }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = useCallback(() => {
    setIsSidebarExpanded((prev) => !prev);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    navigate("/");
  }, [logout, navigate]);

  const menuItems = [
    { icon: FiHome, label: "Dashboard", path: "/admin" },
    { icon: FiPlusSquare, label: "Host Events", path: "/admin/create-event" },
    { icon: FiCalendar, label: "Manage Events", path: "/admin/manage-events" },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* SIDEBAR */}
      <aside className="sticky top-0 h-screen bg-white border-r shadow-lg flex flex-col z-50">
        <div className="p-4 border-b flex items-center justify-between">
          <button
            onClick={toggleSidebar}
            className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-orange-100 flex items-center justify-center"
          >
            <FiMenu />
          </button>

          {isSidebarExpanded && (
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-slate-100"
            >
              <FiChevronLeft />
            </button>
          )}
        </div>

        <nav className="flex-1 px-3 py-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`flex items-center rounded-xl h-14 px-4 gap-4 transition-all
                  ${isActive
                    ? "bg-orange-500 text-white"
                    : "hover:bg-slate-100"}
                `}
              >
                <item.icon className="w-6 h-6" />
                {isSidebarExpanded && (
                  <span className="font-semibold">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full h-12 rounded-xl flex items-center justify-center gap-3 bg-slate-100 hover:bg-red-100"
          >
            <FiLogOut />
            {isSidebarExpanded && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 min-h-screen overflow-y-auto">
        <main className="p-8 max-w-7xl mx-auto">
          {/* 🔥 NO KEY HERE — NO REMOUNT */}
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
