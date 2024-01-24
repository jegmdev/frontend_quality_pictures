import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/Cartelera.css";
import AdminLayout from "../layout/AdminLayout.tsx";

class Cartelera extends Component {
  constructor() {
    super();
    this.state = {
      peliculas: [],
    };
  }

  componentDidMount() {
    const apiUrl = "http://localhost:3001/api/estrenos"; // Nuevo endpoint local

    axios
      .get(apiUrl)
      .then((response) => {
        const peliculas = response.data.map((pelicula) => ({
          id: pelicula.id,
          title: pelicula.titulo,
          overview: pelicula.sinopsis,
          genre: pelicula.genero,
          duration: pelicula.duracion,
          posterPath: pelicula.imagen_promocional,
        }));

        this.setState({ peliculas });
      })
      .catch((error) => {
        console.error("Error al obtener la lista de películas:", error);
      });
  }

  eliminarPelicula = async (peliculaId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/estrenos/${peliculaId}`);
      
      if (response.status === 200) {
        alert('Película eliminada correctamente');
        // Recargar la página
        window.location.reload();
      } else {
        alert('Error al eliminar la película');
        // Manejar el error de acuerdo a tus necesidades
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Error de red al intentar eliminar la película');
      // Manejar el error de red de acuerdo a tus necesidades
    }
  };
  

  render() {
    return (
      <AdminLayout>
        <div>
          <h1>Cartelera</h1>
          <div className="pelicula-container">
            {this.state.peliculas.map((pelicula) => (
              <div key={pelicula.id} className="pelicula">
                <img src={pelicula.posterPath} alt={pelicula.title} />
                <h2>{pelicula.title}</h2>
                <p>
                  <b>Sinopsis:</b> {pelicula.overview}
                </p>
                <p>
                  <b>Género:</b> {pelicula.genre}
                </p>
                <p>
                  <b>Duración:</b> {pelicula.duration}
                </p>
                <button className="button" onClick={() => this.eliminarPelicula(pelicula.id)}>Eliminar</button>
                <button className="button" onClick={() => console.log('Editar', pelicula.id)}>Editar</button>
              </div>
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default Cartelera;
