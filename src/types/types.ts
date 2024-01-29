export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    nombre: string;
    apellidos: string;
    tipo: string;
    direccion: string;
  };
  tokenExpiration: number; 
  message: string;
}

export interface AuthResponseError {
  body: {
    error: string;
  };
}

export interface User {
  email: string;
  nombre: string;
  apellidos: string;
  tipo: string;
  direccion: string;
}

export interface AccessTokenResponse {
  statusCode: number;
  body: {
    accessToken: string;
  };
  error?: string;
}

export interface TokenPayload {
  accessToken: string;
  refreshToken: string;
  tokenExpiration: number;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  getAccessToken: () => string;
  saveUser: (userData: AuthResponse) => void;
  logout: () => void;
  user: User | null;
}