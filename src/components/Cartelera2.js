import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout.tsx";
import "../css/Cartelera.css"

class Cartelera2 extends Component {
  constructor() {
    super();
    this.state = {
      peliculas: [],
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
        const MAX_WORDS = 15;
        const MAX_WORDS2 = 6;
        const peliculas = response.data.results
          .filter((pelicula) => pelicula.title !== "172 Days")
          .slice(0, 18)
          .map((pelicula) => ({
            id: pelicula.id,
            title: limitarPalabras2(pelicula.title, MAX_WORDS2),
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
      <DefaultLayout>
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
                <Link className="button" to={`/pelicula/${pelicula.id}`}>
                  Reservar
                </Link>
              </div>
            ))}
          </div>
        </div>
      </DefaultLayout>
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

function limitarPalabras2(texto, maxPalabras) {
  const palabras = texto.split(" ");
  if (palabras.length > maxPalabras) {
    return palabras.slice(0, maxPalabras).join(" ") + "...";
  }
  return texto;
}

export default Cartelera2;