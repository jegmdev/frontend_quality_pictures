// auth/AuthProvider.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import type { AuthResponse, User, TokenPayload, AuthProviderProps, AuthContextType } from "../types/types";

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
  const [user, setUser] = useState<User | null>(null);
  const [tokenExpiration, setTokenExpiration] = useState<number | null>(null);
  const [redirect, setRedirect] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const parsedToken: TokenPayload = JSON.parse(storedToken);
      setAccessToken(parsedToken.accessToken);
      setRefreshToken(parsedToken.refreshToken);
      setTokenExpiration(parsedToken.tokenExpiration);

      if (parsedToken.tokenExpiration && Date.now() < parsedToken.tokenExpiration * 1000) {
        setIsAuthenticated(true);
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } else {
        logout();
      }
    }
  }, []);

  function getAccessToken() {
    if (tokenExpiration && Date.now() >= tokenExpiration * 1000) {
      setIsAuthenticated(false);
      setAccessToken("");
      setRefreshToken("");
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setRedirect("/login"); // Establecer la redirección a la página de inicio de sesión si el token ha expirado
      return "";
    }
    return accessToken;
  }

  function saveTokenToLocalStorage(token: string, expiration: number) {
    const tokenPayload: TokenPayload = {
      accessToken: token,
      refreshToken: refreshToken,
      tokenExpiration: expiration,
    };
    localStorage.setItem("token", JSON.stringify(tokenPayload));
  }

  function saveUser(userData: AuthResponse) {
    setAccessToken(userData.accessToken);
    setRefreshToken(userData.refreshToken);
    const tokenExpiration = Math.floor(Date.now() / 1000) + 3600; // 1 hora de expiración
    saveTokenToLocalStorage(userData.accessToken, tokenExpiration);
    setIsAuthenticated(true);
    setUser({
      id: userData.user.id,
      email: userData.user.email,
      nombre: userData.user.nombre,
      apellidos: userData.user.apellidos,
      tipo: userData.user.tipo,
      direccion: userData.user.direccion,
    });
    localStorage.setItem("user", JSON.stringify({
      usuarioId: userData.user.id,
      email: userData.user.email,
      nombre: userData.user.nombre,
      apellidos: userData.user.apellidos,
      tipo: userData.user.tipo,
      direccion: userData.user.direccion,
    }));
  }  

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setAccessToken("");
    setRefreshToken("");
    setUser(null);
    setRedirect("/login");
  }

  // Redireccionar manualmente si es necesario
  useEffect(() => {
    if (redirect) {
      window.location.href = redirect;
    }
  }, [redirect]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, getAccessToken, saveUser, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
