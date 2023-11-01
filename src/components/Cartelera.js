import React, { Component } from 'react';
import axios from 'axios';
import './Cartelera.css'
import Menu from './Menu';
import Profile from './Profile'
import SliderComponent from './SliderComponent';

<div className='MainBanner'>
  <Menu />
  <Profile />
  <SliderComponent />
</div>

class Cartelera extends Component {
  constructor() {
    super();
    this.state = {
      peliculas: [] // Aquí almacenaremos la lista de películas disponibles
    };
  }

  componentDidMount() {
    const apiUrl = 'https://api.themoviedb.org/3/movie/now_playing';
    const apiKey = '14b5366a2c78d02ef27b5efc74e15ed7';
  
    axios.get(apiUrl, {
      params: {
        api_key: apiKey,
        language: 'en-US',
        page: 1
      }
    })
    .then(response => {
      const peliculas = response.data.results.slice(0, 9).map(pelicula => ({
        id: pelicula.id,
        title: pelicula.title,
        overview: pelicula.overview,
        posterPath: `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`, // Obtenemos la URL del póster
        releaseDate: pelicula.release_date
        // Puedes agregar más detalles de la película aquí si es necesario
      }));
      this.setState({ peliculas });
    })
    .catch(error => {
      console.error('Error al obtener la lista de películas:', error);
    });
  }
  
  
  render() {
    return (
      <div>
      <div className="pelicula-container">
        {this.state.peliculas.map(pelicula => (
          <div key={pelicula.id} className="pelicula">
            <img src={pelicula.posterPath} alt={pelicula.title} />
            <h2>{pelicula.titulo}</h2>
            <p>Género: {pelicula.genero}</p>
            <p>Sinopsis: {pelicula.sinopsis}</p>
            <img src={pelicula.imagen} alt={pelicula.titulo} />
            <p>Formato: {pelicula.formato}</p>
            <p>Duración: {pelicula.duracion} minutos</p>
            <button>Reservar</button>
          </div>
        ))}
      </div>
    </div>
    );
  }
};

export default Cartelera;
