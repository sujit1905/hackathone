// src/App.jsx
import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import EventDetails from "./pages/EventDetails";
import MyEvents from "./pages/MyEvents";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Wishlist from "./pages/Wishlist";
import Clubs from "./pages/Clubs";
import Events from "./pages/Events";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";


import RouteLoader from "./components/common/RouteLoader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Lottie from "lottie-react";

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

// Lottie preloader using your JSON file
// Lottie preloader using your JSON file
// Lottie preloader using your JSON file
// Lottie preloader using your JSON file
// Lottie preloader using your JSON file
// Lottie preloader using your JSON file
const LottiePreloader = () => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
    <div className="flex flex-col items-center gap-5">
      {/* Animated logo text */}
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-xl lg:text-2xl text-slate-900 font-semibold tracking-tight"
      >
        DNICA<span className="text-[#fa8c16]">EventHub</span>
      </motion.span>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-xs sm:text-sm text-slate-500"
      >
        Discover India&apos;s best campus events.
      </motion.p>

      {/* Lottie + glow */}
      <div className="relative">
        {/* Soft animated glow behind loader */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[#fa8c16]/20 blur-xl"
          initial={{ opacity: 0.3, scale: 0.9 }}
          animate={{ opacity: 0.8, scale: 1.05 }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <div className="relative">
          <Lottie
            path="/animations/SKILLED TEAM.json"
            loop
            autoplay
            style={{ width: 250, height: 250 }}
          />
        </div>
      </div>

      {/* Loading text with animated dots */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="text-[11px] sm:text-xs text-slate-400 tracking-[0.18em] uppercase"
      >
        Loading experience<span className="animate-pulse">...</span>
      </motion.p>
    </div>
  </div>
);


const App = () => {
  const location = useLocation();
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // Hide preloader after 2 seconds (change 2000 if you want longer/shorter)
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      {/* Startup preloader overlay */}
      {showPreloader && <LottiePreloader />}

      {/* Navbar */}
      <Navbar />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      {/* Loader shown on every route change + content */}
      <RouteLoader>
        <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <Page>
                    <Home />
                  </Page>
                }
              />

              <Route
                path="/events"
                element={
                  <Page>
                    <Events />
                  </Page>
                }
              />

              <Route
                path="/events/:id"
                element={
                  <Page>
                    <EventDetails />
                  </Page>
                }
              />

              <Route
                path="/clubs"
                element={
                  <Page>
                    <Clubs />
                  </Page>
                }
              />

              <Route
                path="/about"
                element={
                  <Page>
                    <About />
                  </Page>
                }
              />

              <Route
                path="/contact"
                element={
                  <Page>
                    <Contact />
                  </Page>
                }
              />

              <Route
                path="/login"
                element={
                  <Page>
                    <Login />
                  </Page>
                }
              />

              <Route
                path="/register"
                element={
                  <Page>
                    <Register />
                  </Page>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Page>
                      <Profile />
                    </Page>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/my-events"
                element={
                  <ProtectedRoute>
                    <Page>
                      <MyEvents />
                    </Page>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin"
                element={
                  <ProtectedRoute role="admin">
                    <Page>
                      <AdminDashboard />
                    </Page>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/wishlist"
                element={
                  <Page>
                    <Wishlist />
                  </Page>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>
      </RouteLoader>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
