import { useEffect, useState } from "react";
import { Routes, Route, useLocation, Link, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import EventDetails from "./pages/EventDetails";
import MyEvents from "./pages/MyEvents";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateEvent from "./pages/admin/CreateEvent";
import ManageEvents from "./pages/admin/ManageEvents";
import AdminLayout from "./components/layout/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Wishlist from "./pages/Wishlist";
import Events from "./pages/Events";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import RouteLoader from "./components/common/RouteLoader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lottie from "lottie-react";

// Page animations
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const Page = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="min-h-[calc(100vh-64px)]"
  >
    {children}
  </motion.div>
);

// Lottie preloader
const LottiePreloader = () => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
    <div className="flex flex-col items-center gap-5">
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-xl lg:text-2xl text-slate-900 font-semibold tracking-tight"
      >
        CLG<span className="text-[#fa8c16]">EventHub</span>
      </motion.span>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.85 }} transition={{ delay: 0.4, duration: 0.5 }} className="text-xs sm:text-sm text-slate-500">
        Discover India's best campus events.
      </motion.p>
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-full bg-[#fa8c16]/20 blur-xl"
          initial={{ opacity: 0.3, scale: 0.9 }}
          animate={{ opacity: 0.8, scale: 1.05 }}
          transition={{ duration: 1.6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        <div className="relative">
          <Lottie path="/animations/SKILLED TEAM.json" loop autoplay style={{ width: 250, height: 250 }} />
        </div>
      </div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.9 }} transition={{ delay: 0.6, duration: 0.5 }} className="text-[11px] sm:text-xs text-slate-400 tracking-[0.18em] uppercase">
        Loading experience<span className="animate-pulse">...</span>
      </motion.p>
    </div>
  </div>
);

// ✅ AUTH LOADING SCREEN
const AuthLoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50">
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center p-12"
    >
      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl animate-spin-slow">
        <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <h2 className="text-2xl lg:text-3xl font-black text-slate-900 mb-2">Loading Dashboard</h2>
      <p className="text-lg text-slate-600 max-w-md mx-auto">Checking authentication status...</p>
    </motion.div>
  </div>
);

// ✅ PERFECT AppContent - NO WHITE SCREEN ON LOGOUT!
const AppContent = () => {
  const location = useLocation();
  const { isLoading, user } = useAuth();

  // 1. LOADING SCREEN
  if (isLoading) {
    return <AuthLoadingScreen />;
  }

  // 2. PUBLIC/STUDENT APP (user null OR student)
 // ✅ FIXED: Public/Student Routes - Proper JSX closing tags
if (!user || user.role === "student") {
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <>
            <Navbar />
            <main className="max-w-6xl mx-auto px-4 py-8 flex-1">
              <Page><Home /></Page>
            </main>
            <Footer />
          </>
        } />
        <Route path="/events" element={
          <>
            <Navbar />
            <main className="max-w-6xl mx-auto px-4 py-8 flex-1">
              <Page><Events /></Page>
            </main>
            <Footer />
          </>
        } />
        <Route path="/events/:id" element={
          <>
            <Navbar />
            <main className="max-w-6xl mx-auto px-4 py-8 flex-1">
              <Page><EventDetails /></Page>
            </main>
            <Footer />
          </>
        } />
        <Route path="/about" element={
          <>
            <Navbar />
            <main className="max-w-6xl mx-auto px-4 py-8 flex-1">
              <Page><About /></Page>
            </main>
            <Footer />
          </>
        } />
        <Route path="/contact" element={
          <>
            <Navbar />
            <main className="max-w-6xl mx-auto px-4 py-8 flex-1">
              <Page><Contact /></Page>
            </main>
            <Footer />
          </>
        } />
        <Route path="/login" element={
          <>
            <Navbar />
            <main className="max-w-6xl mx-auto px-4 py-8 flex-1">
              <Page><Login /></Page>
            </main>
          </>
        } />
        <Route path="/register" element={
          <>
            <Navbar />
            <main className="max-w-6xl mx-auto px-4 py-8 flex-1">
              <Page><Register /></Page>
            </main>
          </>
        } />
        <Route path="/wishlist" element={
          <ProtectedRoute>
            <>
              <Navbar />
              <main className="max-w-6xl mx-auto px-4 py-8 flex-1">
                <Page><Wishlist /></Page>
              </main>
              <Footer />
            </>
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <>
              <Navbar />
              <main className="flex-1">
                <Page><Profile /></Page>
              </main>
              <Footer />
            </>
          </ProtectedRoute>
        } />
        <Route path="/my-events" element={
          <ProtectedRoute>
            <>
              <Navbar />
              <main className="max-w-6xl mx-auto px-4 py-8 flex-1">
                <Page><MyEvents /></Page>
              </main>
              <Footer />
            </>
          </ProtectedRoute>
        } />
        <Route path="*" element={
          <>
            <Navbar />
            <main className="max-w-6xl mx-auto px-4 py-8 flex-1">
              <Page>
                <div className="min-h-[50vh] flex flex-col items-center justify-center text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-2xl flex items-center justify-center">
                    <span className="text-3xl">404</span>
                  </div>
                  <h1 className="text-4xl font-bold text-slate-900 mb-4">Page Not Found</h1>
                  <p className="text-lg text-slate-600 mb-8 max-w-md">The page you're looking for doesn't exist.</p>
                  <Link to="/" className="px-8 py-4 bg-gradient-to-r from-[#00a2ff] to-[#007ad9] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all text-lg">
                    ← Go Home
                  </Link>
                </div>
              </Page>
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </AnimatePresence>
  );
}


  // 3. ADMIN PANEL (admin role only)
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/admin/*" element={
          <AdminLayout>
            <Routes>
              <Route index element={<AdminDashboard />} />
              <Route path="create-event" element={<CreateEvent />} />
              <Route path="manage-events" element={<ManageEvents />} />
              <Route path="queries" element={<div className="p-12 text-center text-slate-500">Queries Page - Coming Soon</div>} />
              <Route path="analytics" element={<div className="p-12 text-center text-slate-500">Analytics Page - Coming Soon</div>} />
              <Route path="settings" element={<div className="p-12 text-center text-slate-500">Settings Page - Coming Soon</div>} />
            </Routes>
          </AdminLayout>
        } />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      {showPreloader && <LottiePreloader />}
      <RouteLoader>
        <AppContent />
      </RouteLoader>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
};

export default App;
