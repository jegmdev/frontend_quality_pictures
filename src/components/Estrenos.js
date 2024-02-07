import React, { Component} from "react";
import { Link } from "react-router-dom"; 
import axios from "axios";
import DefaultLayout from "../layout/DefaultLayout.tsx";
import "../css/Cartelera.css";

class Estrenos extends Component {
  constructor() {
    super();
    this.state = {
      peliculas: [],
    };
  }

  componentDidMount() {
    const apiUrl = "http://localhost:3001/api/estrenos";

    axios
      .get(apiUrl)
      .then((response) => {
        const peliculas = response.data.map((pelicula) => ({
          id: pelicula.id,
          title: pelicula.titulo,
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

  render() {
    return (
      <DefaultLayout>
        <div>
          <h1>Restrenos</h1>
          <div className="pelicula-container">
            {this.state.peliculas.map((pelicula) => (
              <div key={pelicula.id} className="pelicula">
                <img src={pelicula.posterPath} alt={pelicula.title} />
                <h2>{pelicula.title}</h2>
                <p>
                  <b>Género:</b> {pelicula.genre}
                </p>
                <p>
                  <b>Duración: {pelicula.duration} minutos</b>
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

export default Estrenos;
