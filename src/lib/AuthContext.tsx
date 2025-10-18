import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  isLoggedIn: boolean;
  phone: string | null;
  login: (phone: string) => void;
  logout: () => void;
  isLoginOpen: boolean;
  setLoginOpen: (v: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phone, setPhone] = useState<string | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();

  const login = (p: string) => {
    setPhone(p);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setPhone(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  const setLoginOpen = (v: boolean) => setIsLoginOpen(v);

  return (
    <AuthContext.Provider value={{ isLoggedIn, phone, login, logout, isLoginOpen, setLoginOpen }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
