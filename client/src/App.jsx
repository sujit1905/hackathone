// src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import EventDetails from "./pages/EventDetails";
import MyEvents from "./pages/MyEvents";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Preloader from "./components/ui/Preloader";

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
    <div className="min-h-screen bg-white text-slate-900">
      {/* Startup preloader overlay (optional) */}
      <Preloader />

      {/* Navbar always on white */}
      <Navbar />

      {/* Content area centered under navbar */}
      <main className="max-w-6xl mx-auto px-4 py-8">
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
              path="/events/:id"
              element={
                <Page>
                  <EventDetails />
                </Page>
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
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
