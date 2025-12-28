import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiHome, FiCalendar, FiUsers, FiSettings, FiLogOut, FiPlusSquare, FiChevronRight, FiChevronLeft, FiUser, FiMenu } from "react-icons/fi";
import { HiOutlineChartBar } from "react-icons/hi2";

const AdminLayout = ({ children }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { icon: FiHome, label: "Dashboard", path: "/admin" },
    { icon: FiPlusSquare, label: "Host Events", path: "/admin/create-event" },
    { icon: FiCalendar, label: "Manage Events", path: "/admin/manage-events" },
    { icon: FiUsers, label: "Queries", path: "/admin/queries" },
    { icon: HiOutlineChartBar, label: "Analytics", path: "/admin/analytics" },
    { icon: FiSettings, label: "Settings", path: "/admin/settings" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex">
      {/* 🔥 STICKY COLLAPSIBLE SIDEBAR - NEVER MOVES */}
      <motion.aside
        initial={{ width: 280 }}
        animate={{ width: isSidebarExpanded ? 280 : 80 }}
        className="sticky top-0 h-screen bg-gradient-to-b from-white to-slate-50 shadow-xl border-r border-slate-200/50 flex flex-col transition-all duration-300 overflow-hidden z-50 flex-shrink-0"
      >
        {/* Logo Section with Hamburger */}
        <div className="p-6 border-b border-slate-200/50 flex-shrink-0">
          <div className="flex items-center justify-between">
            <AnimatePresence mode="wait">
              {isSidebarExpanded ? (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center gap-3"
                >
                  <button
                    onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                    className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 hover:from-[#fa8c16]/10 hover:to-orange-500/10 rounded-xl flex items-center justify-center shadow-sm border border-slate-200/50 hover:border-[#fa8c16]/30 transition-all duration-200 group"
                  >
                    <FiMenu className="w-5 h-5 text-slate-600 group-hover:text-[#fa8c16] transition-colors duration-200" />
                  </button>
                  <div className="flex flex-col">
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">AdminHub</h1>
                    <p className="text-xs text-slate-500 font-medium tracking-wide">Event Management</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mx-auto"
                >
                  <button
                    onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                    className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 hover:from-[#fa8c16]/10 hover:to-orange-500/10 rounded-xl flex items-center justify-center shadow-sm border border-slate-200/50 hover:border-[#fa8c16]/30 transition-all duration-200 group"
                  >
                    <FiMenu className="w-5 h-5 text-slate-600 group-hover:text-[#fa8c16] transition-colors duration-200" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            
            {isSidebarExpanded && (
              <button
                onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200 text-slate-500 hover:text-slate-700"
                aria-label="Collapse sidebar"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Menu - Scrollable */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-2 sticky top-0 bg-white/80 backdrop-blur-sm z-10">
            <AnimatePresence>
              {isSidebarExpanded && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Navigation
                </motion.span>
              )}
            </AnimatePresence>
          </p>
          
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.path}
                onHoverStart={() => setHoveredItem(item.path)}
                onHoverEnd={() => setHoveredItem(null)}
                whileHover={{ x: 4 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded-xl font-medium transition-all duration-200 group relative ${
                    isActive
                      ? "bg-gradient-to-r from-[#fa8c16] to-orange-500 text-white shadow-lg shadow-orange-500/30"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <div className={`relative flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? "bg-white/20" 
                      : "bg-slate-100 group-hover:bg-slate-200"
                  }`}>
                    <item.icon className={`w-4.5 h-4.5 transition-all duration-200 ${
                      isActive ? "text-white" : "text-slate-500 group-hover:text-[#fa8c16]"
                    }`} />
                  </div>
                  
                  <AnimatePresence>
                    {isSidebarExpanded && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="ml-3 flex-1 min-w-0"
                      >
                        <span className="text-sm font-semibold whitespace-nowrap">
                          {item.label}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Active indicator */}
                  {isActive && isSidebarExpanded && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full"
                    />
                  )}
                  
                  {/* Hover indicator */}
                  {hoveredItem === item.path && !isActive && isSidebarExpanded && (
                    <motion.div
                      className="absolute right-3 w-1 h-1 bg-slate-400 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* User & Logout Section - Always visible */}
        <div className="p-4 border-t border-slate-200/50 space-y-3 flex-shrink-0 bg-white/80 backdrop-blur-sm">
          <AnimatePresence>
            {isSidebarExpanded ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="p-3 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-200/50 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                    <FiUser className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {user?.name || "Admin User"}
                    </p>
                    <p className="text-xs text-slate-500 truncate">Event Administrator</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex justify-center">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                  <FiUser className="w-5 h-5 text-white" />
                </div>
              </div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className={`flex items-center gap-3 p-3 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-red-50 hover:to-red-100 text-slate-700 hover:text-red-600 rounded-xl border border-slate-200/50 hover:border-red-200 transition-all duration-200 font-medium text-sm group w-full ${
              isSidebarExpanded ? "justify-start" : "justify-center"
            }`}
          >
            <div className="relative">
              <FiLogOut className="w-5 h-5 flex-shrink-0 transition-all duration-200 group-hover:scale-110" />
            </div>
            <AnimatePresence>
              {isSidebarExpanded && (
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -5 }}
                  className="font-semibold whitespace-nowrap"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.aside>

      {/* 🔥 MAIN CONTENT AREA - Scrolls independently */}
      <div className="flex-1 min-h-screen flex flex-col overflow-hidden">
        {/* Top Header - Sticky */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/50 px-6 py-4 shadow-sm flex-shrink-0">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {menuItems.find(item => item.path === location.pathname)?.label || "Dashboard"}
              </h2>
              <p className="text-sm text-slate-500">Welcome back, {user?.name || "Admin"}!</p>
            </div>
            
            <button
              onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200 text-slate-600 hover:text-slate-900"
              aria-label="Toggle sidebar"
            >
              <FiMenu className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
