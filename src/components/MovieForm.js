import React, { useState } from "react";
import "../css/MovieForm.css";
import AdminLayout from "../layout/AdminLayout.tsx";

const MovieForm = () => {
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [imagen_promocional, setImagen_promocional] = useState("");
  const [formato, setFormato] = useState("");
  const [duracion, setDuracion] = useState("");
  const [valor_boleta, setValor_boleta] = useState("");
  const [message, setMessage] = useState(""); // Nuevo estado para mensajes

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validación de título
    if (!titulo) {
      setMessage("El título es obligatorio");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/estrenos", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo,
          genero,
          sinopsis,
          imagen_promocional,
          formato,
          duracion,
          valor_boleta,
        }),
      });

      if (response.ok) {
        console.log("Película agregada correctamente");
        setMessage("Película agregada correctamente");
        // Puedes redirigir a otra página o realizar otras acciones después de agregar la película
        // Recargar la página
        window.location.reload();
      } else {
        console.error("Error al agregar la película");
        setMessage("Error al agregar la película");
      }
    } catch (error) {
      console.error("Error de red:", error);
      setMessage("Error de red al agregar la película");
    }
  };

  return (
    <AdminLayout>
      <div className="MovieForm">
        <h2>Agregar Película</h2>
        {/* Mostrar mensaje */}
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <label>Título:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
          <br />
          <label>Género:</label>
          <input
            type="text"
            id="genero"
            name="genero"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            required
          />
          <br />
          <label>Sinopsis:</label>
          <textarea
            name="sinopsis"
            id="sinopsis"
            value={sinopsis}
            onChange={(e) => setSinopsis(e.target.value)}
            required
          />
          <br />
          <label>URL Imagen promocional:</label>
          <input
            type="url" // Cambiado de "input" a "url"
            id="imagen_promocional"
            name="imagen_promocional"
            value={imagen_promocional}
            onChange={(e) => setImagen_promocional(e.target.value)}
            required
          />
          <br />
          <label>Formato:</label>
          <select
            value={formato}
            onChange={(e) => setFormato(e.target.value)}
            required
          >
            <option value="2D">2D</option>
            <option value="3D">3D</option>
          </select>
          <br />
          <label>Duración:</label>
          <input
            type="text"
            id="duracion"
            name="duracion"
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
            required
          />
          <br />
          <label>Valor de la boleta:</label>
          <input
            type="text"
            id="valor_boleta"
            name="valor_boleta"
            value={valor_boleta}
            onChange={(e) => setValor_boleta(e.target.value)}
            required
          />
          <br />
          <button type="submit">Crear película</button>
        </form>
      </div>
      <br />
      <br />
    </AdminLayout>
  );
};

export default MovieForm;
