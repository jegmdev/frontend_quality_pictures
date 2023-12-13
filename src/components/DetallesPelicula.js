import React, { Component } from "react";

class DetallesPelicula extends Component {
  render() {
    const { pelicula } = this.props.location.state || {};

    if (!pelicula) {
      // Manejo de caso en el que no se proporciona la información de la película
      return <div>Error: No se proporcionaron detalles de la película</div>;
    }

    return (
      <div>
        <h1>{pelicula.title}</h1>
        <img src={pelicula.posterPath} alt={pelicula.title} />
        <p>
          <b>Género:</b> {pelicula.genre}
        </p>
        <p>
          <b>Duración:</b> {pelicula.duration}
        </p>
        <p>
          <b>Sinopsis:</b> {pelicula.overview}
        </p>
        {/* Agrega más detalles según sea necesario */}
        <label htmlFor="horarios">Horarios disponibles:</label>
        <select id="horarios">
          <option value="12pm">12pm</option>
          <option value="3pm">3pm</option>
          <option value="6pm">6pm</option>
          <option value="9pm">9pm</option>
        </select>
        <p>Valor de la boleta: $10</p>
        <button onClick={() => this.mostrarVistaSillas()}>Reservar</button>
        <button onClick={() => this.regresarAcartelera()}>Regresar a Cartelera</button>
      </div>
    );
  }

  mostrarVistaSillas() {
    // Lógica para mostrar la vista de selección de sillas
  }

  regresarAcartelera() {
    // Lógica para regresar a la cartelera
    this.props.history.push("/cartelera");
  }
}

export default DetallesPelicula;
