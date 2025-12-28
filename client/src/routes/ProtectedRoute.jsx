import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user, isLoading } = useAuth();

  console.log("🔍 PROTECTED ROUTE DEBUG:", { user, role, isLoading });

  // ✅ SHOW LOADING SPINNER
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // ✅ NO USER → LOGIN
  if (!user) {
    console.log("🚫 No user - redirect to login");
    return <Navigate to="/login" replace />;
  }

  // ✅ WRONG ROLE → HOME
  if (role === "admin" && user.role !== "admin") {
    console.log("🚫 Not admin - redirect to home");
    return <Navigate to="/" replace />;
  }

  console.log("✅ Access granted - Role:", user.role);
  return children;
};

export default ProtectedRoute;
