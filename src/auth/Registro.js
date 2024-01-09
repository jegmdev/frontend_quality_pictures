import React, { useState } from "react";
import "../css/Registro.css";
import DefaultLayout from "../layout/DefaultLayout.tsx";
import { useAuth } from './AuthProvider.tsx';
import { Navigate, useNavigate } from "react-router";

const Registro = () => {
  const [correo, setCorreo] = useState("");
  const [error, setError] = useState("");
  const [correoConfirmado, setCorreoConfirmado] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [contraseñaConfirmada, setContraseñaConfirmada] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [tipo, setTipo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [celular, setCelular] = useState("");
  const [documento_identidad, setdocumento_identidad] = useState("");
  const auth = useAuth();
  const goTo = useNavigate();

  if (auth.isAuthenticated) {
    return <Navigate to='/admin' />
  }

  const validarFormulario = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (
      !correo ||
      !contraseña ||
      !nombre ||
      !apellidos ||
      !tipo ||
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
      const response = await fetch('http://localhost:3001/api/registro', {
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
          tipo,
          direccion,
          celular,
          documento_identidad,
        }),
      });

      if (response.ok) {
        setError("Registro exitoso")
        console.log("200");
        goTo("/login")
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
      setError("Error en la solicitud")
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <DefaultLayout>
      <div className="Registro">
        <h1>Registro</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={validarFormulario}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <input
            type="email"
            placeholder="Confirmar correo electrónico"
            value={correoConfirmado}
            onChange={(e) => setCorreoConfirmado(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={contraseñaConfirmada}
            onChange={(e) => setContraseñaConfirmada(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="text"
            placeholder="Apellidos"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
          />
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="">Seleccione un tipo</option>
            <option value="1">Cliente</option>
            <option value="2">Funcionario</option>
          </select>
          <input
            type="text"
            placeholder="Dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
          <input
            type="text"
            placeholder="Celular"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
          />
          <input
            type="text"
            placeholder="Documento de identidad"
            value={documento_identidad}
            onChange={(e) => setdocumento_identidad(e.target.value)}
          />
          <button type="submit">Registrarme</button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default Registro;
