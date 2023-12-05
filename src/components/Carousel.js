import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/Carousel.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Carousel = () => {
  const [movieData, setMovieData] = useState([]);

  const fetchMovieData = async () => {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/now_playing',
        {
          params: {
            api_key: '14b5366a2c78d02ef27b5efc74e15ed7',
            language: 'es-ES',
            page: 1,
          },
        }
      );

      const movies = response.data.results.slice(0, 6).map(async (movie) => {
        const detailsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}`,
          {
            params: {
              api_key: '14b5366a2c78d02ef27b5efc74e15ed7',
              language: 'es-ES',
            },
          }
        );

        return {
          title: movie.title,
          overview: detailsResponse.data.overview,
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          showtimes: ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM'],
          trailerLink: `https://www.youtube.com/watch?v=${movie.id}`,
          genre: detailsResponse.data.genres.map((genre) => genre.name).join(', '),
          duration: detailsResponse.data.runtime,
        };
      });

      Promise.all(movies).then((resolvedMovies) => {
        setMovieData(resolvedMovies);
      });
    } catch (error) {
      console.error('Error al obtener los datos de las películas:', error);
    }
  };

  useEffect(() => {
    fetchMovieData();
  }, []);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {movieData.map((movie, index) => (
          <div key={index} className="movie-card">
            <img src={movie.image} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p><strong>Género:</strong> {movie.genre}</p>
            <p><strong>Duración:</strong> {movie.duration} minutos</p>
            <ul>
              <strong>Funciones:</strong>{movie.showtimes.map((showtime, i) => (
                <li key={i}>{showtime}</li>
              ))}
            </ul>
            <div className="overlay">
              <a href={movie.trailerLink} className="button">
                Ver tráiler
              </a>
              <Link className="button" to='/reserva'>Reservar</Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
