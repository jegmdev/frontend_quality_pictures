export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
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
