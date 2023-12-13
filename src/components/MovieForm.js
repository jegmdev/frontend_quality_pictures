import React, { Component } from "react";
import "../css/MovieForm.css";

class MovieForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      genre: "",
      synopsis: "",
      promotionalImage: null, // Cambiado a un objeto File
      format: "2D",
      duration: "",
      ticketValue: "",
    };
  }

  handleChange = (event) => {
    const { name, value, type } = event.target;

    // Si el campo es un archivo, manejarlo de manera diferente
    if (type === "file") {
      this.setState({ [name]: event.target.files[0] });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    // Validación de título
    if (!this.state.title) {
      console.error("El título es obligatorio");
      return;
    }

    const { title, genre, synopsis, promotionalImage, format, duration, ticketValue } = this.state;

    const formData = new FormData();
    formData.append("titulo", title);
    formData.append("genero", genre);
    formData.append("sinopsis", synopsis);
    formData.append("promotionalImage", promotionalImage);
    formData.append("formato", format);
    formData.append("duracion", duration);
    formData.append("valor_boleta", ticketValue);

    try {
      const response = await fetch("http://localhost:3001/api/estrenos", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Película agregada correctamente");
        // Puedes redirigir a otra página o realizar otras acciones después de agregar la película
      } else {
        console.error("Error al agregar la película");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  render() {
    return (
      <div className="MovieForm">
        <h2>Agregar Película</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Título:
          </label>
          <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          <br />
          <label>
            Género:
          </label>
          <input
              type="text"
              name="genre"
              value={this.state.genre}
              onChange={this.handleChange}
            />
          <br />
          <label>
            Sinópsis:
          </label>
          <textarea
              name="synopsis"
              value={this.state.synopsis}
              onChange={this.handleChange}
            />
          <br />
          <label>
            Imagen promocional:
          </label>
          <input
              type="file"
              name="promotionalImage"
              onChange={this.handleChange}
            />
          <br />
          <label>
            Formato:
          </label>
          <select
              name="format"
              value={this.state.format}
              onChange={this.handleChange}
            >
              <option value="2D">2D</option>
              <option value="3D">3D</option>
            </select>
          <br />
          <label>
            Duración:
          </label>
          <input
              type="text"
              name="duration"
              value={this.state.duration}
              onChange={this.handleChange}
            />
          <br />
          <label>
            Valor de la boleta:
          </label>
          <input
              type="text"
              name="ticketValue"
              value={this.state.ticketValue}
              onChange={this.handleChange}
            />
          <br />
          <button type="submit">Crear película</button>
        </form>
      </div>
    );
  }
}

export default MovieForm;