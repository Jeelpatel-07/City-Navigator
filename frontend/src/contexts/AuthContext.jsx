// frontend/src/contexts/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import { authService, vendorService } from '../services/api.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVendor, setIsVendor] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await authService.getCurrentUser();
        setUser(userData);
        // Check if user is vendor (based on role or localStorage flag)
        const vendorFlag = localStorage.getItem('isVendor') === 'true';
        setIsVendor(vendorFlag);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('isVendor');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password, userType = "customer") => {
  try {
    const response =
      userType === "vendor"
        ? await vendorService.loginVendor(email, password)
        : await authService.login(email, password);

    // 🔹 SAVE TOKEN
    localStorage.setItem("token", response.token);

    // 🔹 SAVE USER
    setUser(response.user);

    // 🔹 FIX: SAVE isVendor PROPERLY
    const isVendorUser = response.user.role === "VENDOR";
    setIsVendor(isVendorUser);
    localStorage.setItem("isVendor", isVendorUser ? "true" : "false");

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};



  const registerUser = async (userData) => {
    try {
      const { user, token } = await authService.register(userData);
      localStorage.setItem('token', token);
      localStorage.setItem('isVendor', false);
      setUser(user);
      setIsVendor(false);
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const registerVendor = async (vendorData) => {
  try {
    await vendorService.registerVendor(vendorData);

    // ❗ DO NOT auto-login vendor
    // Password is emailed, user must login manually

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

  const changePassword = async (currentPassword, newPassword, confirmPassword) => {
    try {
      await authService.changePassword(currentPassword, newPassword, confirmPassword);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isVendor');
    setUser(null);
    setIsVendor(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isVendor,
      login, 
      logout, 
      registerUser,
      registerVendor,
      changePassword,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};