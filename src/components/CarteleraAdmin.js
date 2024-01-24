import React, { Component } from "react";
import axios from "axios";
import "../css/Cartelera.css";
import AdminLayout from "../layout/AdminLayout.tsx";

class Cartelera extends Component {
  constructor() {
    super();
    this.state = {
      peliculas: [],
      editingMovieId: null,
      editedMovie: {
        titulo: "",
        genero: "",
        sinopsis: "",
        imagen_promocional: "",
        formato: "",
        duracion: "",
        valor_boleta: "",
      },
    };
  }

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies() {
    const apiUrl = "http://localhost:3001/api/estrenos";

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
        this.fetchMovies(); // Recargar la lista después de eliminar
      } else {
        alert('Error al eliminar la película');
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Error de red al intentar eliminar la película');
    }
  };

  editarPelicula = async (peliculaId) => {
    // Obtener detalles de la película para editar
    const apiUrl = `http://localhost:3001/api/estrenos/${peliculaId}`;

    try {
      const response = await axios.get(apiUrl);

      if (response.status === 200) {
        const editedMovie = response.data;
        this.setState({
          editingMovieId: peliculaId,
          editedMovie: {
            titulo: editedMovie.titulo,
            genero: editedMovie.genero,
            sinopsis: editedMovie.sinopsis,
            imagen_promocional: editedMovie.imagen_promocional,
            formato: editedMovie.formato,
            duracion: editedMovie.duracion,
            valor_boleta: editedMovie.valor_boleta,
          },
        });
      } else {
        console.error('Error al obtener detalles de la película para editar');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  handleEditChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      editedMovie: {
        ...prevState.editedMovie,
        [name]: value,
      },
    }));
  };

  handleCancelEdit = () => {
    this.setState({
      editingMovieId: null,
      editedMovie: {
        titulo: "",
        genero: "",
        sinopsis: "",
        imagen_promocional: "",
        formato: "",
        duracion: "",
        valor_boleta: "",
      },
    });
  };

  handleSaveEdit = async () => {
    const { editingMovieId, editedMovie } = this.state;

    try {
      const response = await axios.put(`http://localhost:3001/api/estrenos/${editingMovieId}`, editedMovie);

      if (response.status === 200) {
        alert('Película editada correctamente');
        this.setState({
          editingMovieId: null,
          editedMovie: {
            titulo: "",
            genero: "",
            sinopsis: "",
            imagen_promocional: "",
            formato: "",
            duracion: "",
            valor_boleta: "",
          },
        });
        this.fetchMovies(); // Recargar la lista después de editar
      } else {
        alert('Error al editar la película');
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Error de red al intentar editar la película');
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
                <button className="button" onClick={() => this.editarPelicula(pelicula.id)}>Editar</button>
                {this.state.editingMovieId === pelicula.id && (
                  <div className="edit-form">
                    <label>Título:</label>
                    <input
                      type="text"
                      name="titulo"
                      value={this.state.editedMovie.titulo}
                      onChange={this.handleEditChange}
                    />
                    <label>Género:</label>
                    <input
                      type="text"
                      name="genero"
                      value={this.state.editedMovie.genero}
                      onChange={this.handleEditChange}
                    />
                    <label>Sinopsis:</label>
                    <textarea
                      name="sinopsis"
                      value={this.state.editedMovie.sinopsis}
                      onChange={this.handleEditChange}
                    />
                    <label>URL Imagen promocional:</label>
                    <input
                      type="url"
                      name="imagen_promocional"
                      value={this.state.editedMovie.imagen_promocional}
                      onChange={this.handleEditChange}
                    />
                    <label>Formato:</label>
                    <select
                      name="formato"
                      value={this.state.editedMovie.formato}
                      onChange={this.handleEditChange}
                    >
                      <option value="2D">2D</option>
                      <option value="3D">3D</option>
                    </select>
                    <label>Duración:</label>
                    <input
                      type="text"
                      name="duracion"
                      value={this.state.editedMovie.duracion}
                      onChange={this.handleEditChange}
                    />
                    <label>Valor de la boleta:</label>
                    <input
                      type="text"
                      name="valor_boleta"
                      value={this.state.editedMovie.valor_boleta}
                      onChange={this.handleEditChange}
                    />
                    <button className="button" onClick={this.handleSaveEdit}>Guardar</button>
                    <button className="button" onClick={this.handleCancelEdit}>Cancelar</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default Cartelera;
