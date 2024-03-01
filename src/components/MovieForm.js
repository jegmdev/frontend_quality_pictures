import React, { useState } from "react";
import "../css/MovieForm.css";
import { API_URL } from "../constants.ts";

const MovieForm = () => {
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [imagen_promocional, setImagen_promocional] = useState("");
  const [formato, setFormato] = useState("");
  const [duracion, setDuracion] = useState("");
  const [valor_boleta, setValor_boleta] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!titulo) {
      setMessage("El título es obligatorio");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/estrenos`, {
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
    <div className="MovieFormContainer">
      <div className="MovieForm">
        <h2>Agregar Película</h2>
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
            type="url"
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
      <div className="PreviewContainer">
        <h2>Previsualización de la película:</h2>
        {titulo && (
          <div className="Card">
            <img src={imagen_promocional} alt="Preview" className="CardImage" />
            <div className="CardBody">
              <h3><b>Título: </b>{titulo}</h3>
              <p><b>Género: </b>{genero}</p>
              <p><b>Sinopsis: </b>{sinopsis}</p>
              <p><b>Formato: </b>{formato}</p>
              <p><b>Duración: </b>{duracion}</p>
              <p><b>Valor boleta: </b>{valor_boleta}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieForm;
