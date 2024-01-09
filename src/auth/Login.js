import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../css/Login.css";
import DefaultLayout from "../layout/DefaultLayout.tsx";
import { useAuth } from './AuthProvider.tsx';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  if (auth.isAuthenticated) {
    return <Navigate to='/admin' />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Inicio de sesión exitoso");
        navigate("/");
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
