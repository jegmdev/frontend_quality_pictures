export interface AuthResponse {
  getAccessToken: string;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    nombre: string;
    apellidos: string;
    tipo: string; // Asegúrate de que tipo esté incluido aquí
    direccion: string;
  };
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
