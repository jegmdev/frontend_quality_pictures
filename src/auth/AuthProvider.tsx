import { useContext, createContext, useState, useEffect } from "react";
import type { AuthResponse } from "../types/types";
import React from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => {},
  saveUser: (userData: AuthResponse) => {},
  logout: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsAuthenticated(true);
    }
  }, []); // Se ejecutará solo una vez al montarse el componente

  function getAccessToken() {
    console.log("getAccessToken called");
    return accessToken;
  }

  function saveTokenToLocalStorage(token: string) {
    localStorage.setItem("token", JSON.stringify(token));
  }

  function saveUser(userData: AuthResponse) {
    console.log("saveUser called with data:", userData);
    setAccessToken(() => userData.getAccessToken);
    setRefreshToken(userData.refreshToken);
    saveTokenToLocalStorage(userData.refreshToken);
    setIsAuthenticated(true);
  }

  function logout() {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    // Otras tareas de limpieza si es necesario
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, getAccessToken, saveUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);