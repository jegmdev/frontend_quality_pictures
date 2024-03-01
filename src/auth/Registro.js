import React, { useState } from "react";
import "../css/Registro.css";
import DefaultLayout from "../layout/DefaultLayout.tsx";
import { useAuth } from "./AuthProvider.tsx";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../constants.ts";

const Registro = () => {
  const [correo, setCorreo] = useState("");
  const [error, setError] = useState("");
  const [correoConfirmado, setCorreoConfirmado] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [contraseñaConfirmada, setContraseñaConfirmada] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [direccion, setDireccion] = useState("");
  const [celular, setCelular] = useState("");
  const [documento_identidad, setdocumento_identidad] = useState("");
  const auth = useAuth();
  const goTo = useNavigate();

  if (auth.isAuthenticated) {
    return <Navigate to="/admin" />;
  }

  const validarFormulario = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (
      !correo ||
      !contraseña ||
      !nombre ||
      !apellidos ||
      !direccion ||
      !celular ||
      !documento_identidad
    ) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    if (correo !== correoConfirmado) {
      setError("Los correos electrónicos no coinciden.");
      return;
    }

    if (contraseña !== contraseñaConfirmada) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (
      contraseña.length < 5 ||
      !/[A-Z]/.test(contraseña) ||
      !/[a-z]/.test(contraseña) ||
      !/\d/.test(contraseña)
    ) {
      setError(
        "La contraseña debe ser de longitud mínima 5, y debe contener letras mayúsculas, letras minúsculas y números."
      );
      return;
    }

    // Validación del campo de correo electrónico
    if (!correo.endsWith(".com")) {
      setError("Correo inválido.");
      return;
    }

    setError(""); // Limpiar mensajes de error previos

    try {
      const response = await fetch(`${API_URL}/api/registro`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo,
          contraseña,
          nombre,
          apellidos,
          direccion,
          celular,
          documento_identidad,
          tipo: "1",
        }),
      });

      if (response.ok) {
        setError("Registro exitoso");
        console.log("200");
        goTo("/login");
      } else {
        const responseData = await response.json();

        if (response.status === 409) {
          setError("El usuario ya existe. Por favor, verfica los datos.");
        } else {
          setError(responseData.message || "Error en el registro");
        }
        console.error("Error en el registro");
      }
    } catch (error) {
      setError("Error en la solicitud");
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <DefaultLayout>
      <div className="Registro">
        <h1>Registro</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={validarFormulario}>
          <label>Correo electrónico:</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <label>Confirmar correo electrónico:</label>
          <input
            type="email"
            value={correoConfirmado}
            onChange={(e) => setCorreoConfirmado(e.target.value)}
          />
          <label>Contraseña:</label>
          <input
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
          <label>Confirmar contraseña:</label>
          <input
            type="password"
            value={contraseñaConfirmada}
            onChange={(e) => setContraseñaConfirmada(e.target.value)}
          />
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <label>Apellidos:</label>
          <input
            type="text"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
          />
          <label>Dirección:</label>
          <input
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
          <label>Celular:</label>
          <input
            type="text"
            value={celular}
            onChange={(e) => {
              const input = e.target.value.replace(/\D/, "").slice(0, 10); // Eliminar caracteres no numéricos y limitar a 10 dígitos
              setCelular(input);
            }}
          />
          <label>Documento de identidad:</label>
          <input
            type="text"
            value={documento_identidad}
            onChange={(e) => {
              const input = e.target.value.replace(/\D/, "").slice(0, 10); // Eliminar caracteres no numéricos y limitar a 10 dígitos
              setdocumento_identidad(input);
            }}
          />
          <p>
            ¿Ya tienes cuenta?{" "}
            <Link className="Link" to="/login">
              Inicia sesión aquí
            </Link>
          </p>
          <button type="submit">REGISTRARME</button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default Registro;
