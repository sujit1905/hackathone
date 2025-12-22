// src/App.jsx
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
import Preloader from "./components/ui/Preloader";
import Wishlist from "./pages/Wishlist";
import Clubs from "./pages/Clubs";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Events from "./pages/Events";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";

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

const App = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      {/* Startup preloader overlay */}
      <Preloader />

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

      {/* Content area */}
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

            {/* NEW: profile page after login */}
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
