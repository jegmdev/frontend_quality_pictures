import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout.tsx";
import "../css/Cartelera.css";

class Cartelera2 extends Component {
  constructor() {
    super();
    this.state = {
      peliculas: [],
    };
  }

  componentDidMount() {
    const apiUrlNowPlaying = "https://api.themoviedb.org/3/movie/now_playing";
    const apiUrlMovieDetails = "https://api.themoviedb.org/3/movie";
    const apiKey = "14b5366a2c78d02ef27b5efc74e15ed7";

    axios
      .get(apiUrlNowPlaying, {
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
          .map((pelicula) => {
            return axios
              .get(`${apiUrlMovieDetails}/${pelicula.id}`, {
                params: {
                  api_key: apiKey,
                  language: "es-ES",
                },
              })
              .then((detailResponse) => {
                const movieDetails = detailResponse.data;
                return {
                  id: pelicula.id,
                  title: pelicula.title,
                  genre: "Género de la película", 
                  duration: `${movieDetails.runtime} min`,
                  posterPath: `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`,
                };
              });
          });

        Promise.all(peliculas).then((peliculasConDetalle) => {
          this.setState({ peliculas: peliculasConDetalle });
        });
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
                  <b>Género:</b> {pelicula.genre}
                </p>
                <p>
                  <b>Duración:</b> {pelicula.duration}
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

export default Cartelera2;
