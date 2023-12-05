import React, { Component } from "react";
import axios from "axios";
import "../css/Cartelera.css";
import "../css/App.css";
import { Link } from "react-router-dom";

class Cartelera extends Component {
  constructor() {
    super();
    this.state = {
      peliculas: [], // Aquí almacenaremos la lista de películas disponibles
    };
  }

  componentDidMount() {
    const apiUrl = "https://api.themoviedb.org/3/movie/now_playing";
    const apiKey = "14b5366a2c78d02ef27b5efc74e15ed7";

    axios
      .get(apiUrl, {
        params: {
          api_key: apiKey,
          language: "es-ES",
          page: 1,
        },
      })
      .then((response) => {
        const MAX_WORDS = 20;
        const peliculas = response.data.results
          .filter((pelicula) => pelicula.title !== "172 Days")
          .slice(0, 15)
          .map((pelicula) => ({
            id: pelicula.id,
            title: pelicula.title,
            overview: limitarPalabras(pelicula.overview, MAX_WORDS),
            posterPath: `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`,
          }));
        this.setState({ peliculas });
      })
      .catch((error) => {
        console.error("Error al obtener la lista de películas:", error);
      });
  }

  render() {
    return (
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
              <Link className="button" to="/reserva">
                Reservar
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

// Función para limitar palabras en la descripción general
function limitarPalabras(texto, maxPalabras) {
  const palabras = texto.split(" ");
  if (palabras.length > maxPalabras) {
    return palabras.slice(0, maxPalabras).join(" ") + "...";
  }
  return texto;
}

export default Cartelera;
