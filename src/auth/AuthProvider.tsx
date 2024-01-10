import { useContext, createContext, useState, useEffect } from "react";
import type {AuthResponse} from "../types/types"
import React from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => {},
  saveUser: (userData: AuthResponse) => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");

  function getAccessToken () {
    console.log("getAccessToken called");
    return accessToken;
  }

  function saveUser(userData: AuthResponse){
    console.log("saveUser called");
    setAccessToken(userData.body.accessToken);
    setRefreshToken(userData.body.refreshToken);
    localStorage.setItem("token", JSON.stringify(userData.body.refreshToken));
    setIsAuthenticated(true);
  }

  return (
    <AuthContext.Provider value = {{ isAuthenticated, getAccessToken, saveUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);