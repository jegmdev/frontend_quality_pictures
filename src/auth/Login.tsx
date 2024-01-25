import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../css/Login.css";
import DefaultLayout from "../layout/DefaultLayout.tsx";
import { useAuth } from "./AuthProvider.tsx";
import { AuthResponse } from "../types/types.ts";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const json = (await response.json()) as AuthResponse;
        console.log("Status 200");
        auth.saveUser(json);

        // Verificar el tipo de usuario y redirigir
        if (json.user.tipo === "1") {
          navigate("/"); // Ruta para usuarios tipo cliente
        } else if (json.user.tipo === "2") {
          navigate("/admin"); // Ruta para usuarios tipo admin
        } else {
          // Tipo de usuario desconocido, manejar según tus necesidades
          console.error("Tipo de usuario desconocido");
        }
      } else {
        if (response.status === 400) {
          setMessage("Correo electrónico o contraseña inválidos");
        } else if (response.status === 401) {
          setMessage("No autorizado");
        } else if (response.status === 404) {
          setMessage("Usuario no existe");
        } else if (response.status === 500) {
          setMessage("Error interno del servidor");
        } else {
          setMessage("Error no identificado");
        }
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setMessage("Error de red al intentar iniciar sesión");
    }
  };

  if (auth.isAuthenticated) {
    return <Navigate to="/admin" />;
  }

  return (
    <DefaultLayout>
      <div className="login-container">
        <h1>INICIAR SESIÓN</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p>{message}</p>
          <p>
            ¿No tienes cuenta?{" "}
            <Link className="Link" to="/registro">
              Regístrate aquí
            </Link>
          </p>
          <button type="submit">INGRESAR</button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default Login;
