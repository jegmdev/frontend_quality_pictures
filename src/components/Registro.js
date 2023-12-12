import React, { useState } from "react";
import "../css/Registro.css";
import DefaultLayout from "../layout/DefaultLayout.tsx";
import { useAuth } from '../auth/AuthProvider.tsx';
import { Navigate } from "react-router";

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
  const [documentoIdentidad, setDocumentoIdentidad] = useState("");
  const auth = useAuth();

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
      !documentoIdentidad
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
      const response = await fetch("http://localhost:3001/api/registro", {
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
          documentoIdentidad,
        }),
      });

      if (response.ok) {
        console.log("Registro exitoso");
        // Puedes redirigir o realizar otras acciones después de un registro exitoso
      } else {
        console.error("Error en el registro");
        // Puedes manejar errores específicos aquí si es necesario
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <DefaultLayout>
      <div className="Registro">
        <h1>Registro</h1>
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
            value={documentoIdentidad}
            onChange={(e) => setDocumentoIdentidad(e.target.value)}
          />
          <button type="submit">Registrarme</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </DefaultLayout>
  );
};

export default Registro;
