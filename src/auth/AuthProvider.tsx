import { useContext, createContext, useState, useEffect } from "react";
import type { AuthResponse, User } from "../types/types";
import React from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextType {
  isAuthenticated: boolean;
  getAccessToken: () => string;
  saveUser: (userData: AuthResponse) => void;
  logout: () => void;
  user: User | null; // Asegúrate de importar la interfaz User de tus tipos
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  getAccessToken: () => "",
  saveUser: (userData: AuthResponse) => {},
  logout: () => {},
  user: null,
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [user, setUser] = useState<User | null>(null); // Inicializamos como null

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
    setAccessToken(userData.accessToken);
    setRefreshToken(userData.refreshToken);
    saveTokenToLocalStorage(userData.refreshToken);
    setIsAuthenticated(true);
    setUser(userData.user); // Asignamos userData.user a user
  }

  function logout() {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null); // Limpiamos el usuario al cerrar sesión
    // Otras tareas de limpieza si es necesario
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, getAccessToken, saveUser, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
