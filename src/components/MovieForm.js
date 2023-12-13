import React, { Component } from "react";
import "../css/MovieForm.css";

class MovieForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      genre: "",
      synopsis: "",
      promotionalImage: "",
      format: "2D",
      duration: "",
      ticketValue: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes realizar acciones adicionales con los datos del formulario, como enviarlos a un servidor, etc.
    console.log("Datos del formulario:", this.state);
  };

  render() {
    return (
      <div className="MovieForm">
        <h2>Agregar película</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Título:</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <br />
          <label>Género:</label>
          <input
            type="text"
            name="genre"
            value={this.state.genre}
            onChange={this.handleChange}
          />
          <br />
          <label>Sinópsis:</label>
          <textarea
            name="synopsis"
            value={this.state.synopsis}
            onChange={this.handleChange}
          />
          <br />
          <label>Imagen promocional:</label>
          <input
            type="file"
            name="promotionalImage"
            value={this.state.promotionalImage}
            onChange={this.handleChange}
          />
          <br />
          <label>Formato:</label>
          <select
            name="format"
            value={this.state.format}
            onChange={this.handleChange}
          >
            <option value="2D">2D</option>
            <option value="3D">3D</option>
          </select>
          <br />
          <label>Duración:</label>
          <input
            type="text"
            name="duration"
            value={this.state.duration}
            onChange={this.handleChange}
          />
          <br />
          <label>Valor de la boleta:</label>
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
