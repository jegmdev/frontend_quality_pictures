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
        <form onSubmit={this.handleSubmit}>
          <label>
            Título:
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Género:
            <input
              type="text"
              name="genre"
              value={this.state.genre}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Sinópsis:
            <textarea
              name="synopsis"
              value={this.state.synopsis}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Imagen promocional:
            <input
              type=""
              name="promotionalImage"
              value={this.state.promotionalImage}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Formato:
            <select
              name="format"
              value={this.state.format}
              onChange={this.handleChange}
            >
              <option value="2D">2D</option>
              <option value="3D">3D</option>
            </select>
          </label>
          <br />
          <label>
            Duración:
            <input
              type="text"
              name="duration"
              value={this.state.duration}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Valor de la boleta:
            <input
              type="text"
              name="ticketValue"
              value={this.state.ticketValue}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <button type="submit">Crear película</button>
        </form>
      </div>
    );
  }
}

export default MovieForm;
