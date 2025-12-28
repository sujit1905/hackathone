import { createContext, useContext, useState, useEffect } from "react";
import { ADMIN_CREDENTIALS } from "../utils/adminConfig";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // Initialize auth state
  useEffect(() => {
    const storedUser = localStorage.getItem("cc_user");
    const storedToken = localStorage.getItem("cc_token");
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false);
  }, []);

  const login = (data) => {
    console.log("🔑 LOGIN CALLED WITH:", data);
    
    const userData = data.role === "admin" 
      ? { ...ADMIN_CREDENTIALS, token: data.token || "admin-token" }
      : { ...data, role: "student" };

    localStorage.setItem("cc_token", data.token || "admin-token");
    localStorage.setItem("cc_user", JSON.stringify(userData));
    setUser(userData);
    
    console.log("✅ USER SET:", userData);
    return { success: true };
  };

  const signup = (data) => {
    if (data.email === ADMIN_CREDENTIALS.email || data.role === "admin") {
      return { success: false, message: "Admin role is predefined. Use student signup." };
    }

    localStorage.setItem("cc_token", data.token);
    localStorage.setItem("cc_user", JSON.stringify({ ...data, role: "student" }));
    setUser({ ...data, role: "student" });
    return { success: true };
  };

  const logout = () => {
    console.log("🔒 LOGOUT INITIATED");
    
    // Clear localStorage
    localStorage.removeItem("cc_token");
    localStorage.removeItem("cc_user");
    
    // Clear state
    setUser(null);
    
    console.log("✅ LOGOUT COMPLETED");
    return Promise.resolve(); // Return a promise
  };

  const value = { user, login, signup, logout, isLoading };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    return { 
      user: null, 
      login: () => {}, 
      signup: () => {}, 
      logout: () => Promise.resolve(),
      isLoading: true 
    };
  }
  return ctx;
};