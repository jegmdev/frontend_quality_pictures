import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';
import axios from 'axios';

const Carousel = () => {
  const [movieData, setMovieData] = useState([]);

  const fetchMovieData = async () => {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/now_playing',
        {
          params: {
            api_key: '14b5366a2c78d02ef27b5efc74e15ed7',
            language: 'en-US',
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
              language: 'en-US',
            },
          }
        );

        return {
          title: movie.title,
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          showtimes: ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM'],
          trailerLink: `https://www.youtube.com/watch?v=${movie.id}`,
          ticketLink: `ticket-link-${movie.id}`,
          genre: detailsResponse.data.genres.map((genre) => genre.name).join(', '),
          duration: detailsResponse.data.runtime,
          overview: detailsResponse.data.overview,
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
    infinite: true,
    speed: 500,
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
              {movie.showtimes.map((showtime, i) => (
                <li key={i}>{showtime}</li>
              ))}
            </ul>
            <div className="overlay">
              <a href={movie.trailerLink} className="button">
                Ver tráiler
              </a>
              <a href={movie.ticketLink} className="button">
                Comprar ticket
              </a>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
