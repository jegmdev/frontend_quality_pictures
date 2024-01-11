import { useContext, createContext, useState, useEffect } from "react";
import type { AuthResponse, AccessTokenResponse, User } from "../types/types";
import React from "react";
import { AccessToken } from "express-openid-connect";
import { set } from "date-fns";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => {},
  getRefreshToken: () => {},
  saveUser: (userData: AuthResponse) => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [user, setUser] = useState<User>();
  //const [refreshToken, setRefreshToken] = useState<string>("");

  useEffect(() => {
    console.log("Running checkAuth in useEffect");
    checkAuth();
  }, []);  

  async function requestNewAccessToken(refreshToken: string) {
    try {
      const response = await fetch("http://localhost:3001/api/refreshToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      if (response.ok) {
        const json = (await response.json()) as AccessTokenResponse;

        if (json.error) {
          throw new Error(json.error);
        }
        return accessToken;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
      return null;
    }
  }

  async function getUserInfo(accessToken: string) {
    try {
      const response = await fetch("http://localhost:3001/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const json = await response.json();

        if (json.error) {
          throw new Error(json.error);
        }
        return json;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
      return null;
    }
  }

  async function checkAuth() {
    if (accessToken) {
      // usuario autenticado
    } else {
      // usuario no autenticado
      const token = getRefreshToken();
      if (token) {
        const newAccessToken = await requestNewAccessToken(token);
        if (newAccessToken) {
          const userInfo = await getUserInfo(newAccessToken);
          if (userInfo) {
            saveSessionInfo(userInfo, newAccessToken, token);
          }
        }
      }
    }
  }

  function saveSessionInfo(userInfo: User, accessToken: string, refreshToken: string) {
    console.log("Saving session info to localStorage");
    setAccessToken(accessToken);
    localStorage.setItem("token", JSON.stringify(refreshToken));
    setIsAuthenticated(true);
    setUser(userInfo);
  }
  

  function getAccessToken() {
    console.log("getAccessToken called");
    return accessToken;
  }

  function getRefreshToken(): string | null {
    console.log("getRefreshToken called");
    const tokenData = localStorage.getItem("token");
    if (tokenData) {
      const { token } = JSON.parse(tokenData);
      return token;
    } else {
      console.log("Error al obtener el token");
    }
    return null;
  }

  function saveUser(userData: AuthResponse) {
    console.log("saveUser called");
    saveSessionInfo (
     userData.user,
     userData.accessToken,
     userData.refreshToken
    );
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, getAccessToken, saveUser, getRefreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
