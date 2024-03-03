import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/Carousel.css";
import axios from "axios";
import { Link } from "react-router-dom";

const fetchData = async (url, params) => {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    throw error;
  }
};

const getMovieDetails = async (movie) => {
  try {
    const detailsResponse = await fetchData(
      `https://api.themoviedb.org/3/movie/${movie.id}`,
      {
        api_key: "14b5366a2c78d02ef27b5efc74e15ed7",
        language: "es-ES",
      }
    );

    return {
      id: movie.id,
      title: movie.title,
      overview: detailsResponse.overview,
      image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      showtimes: ["12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"],
      genre: detailsResponse.genres.map((genre) => genre.name).join(", "),
      duration: detailsResponse.runtime,
    };
  } catch (error) {
    console.error("Error al obtener detalles de la película:", error);
    return null;
  }
};

const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};

const Carousel = () => {
  const [movieData, setMovieData] = useState([]);

  const fetchMovieData = async () => {
    try {
      const response = await fetchData(
        "https://api.themoviedb.org/3/movie/now_playing",
        {
          api_key: "14b5366a2c78d02ef27b5efc74e15ed7",
          language: "es-ES",
          page: 1,
        }
      );

      const movies = await Promise.all(
        response.results
          .filter(
            (pelicula) =>
              pelicula.title !==
              "Los Juegos del Hambre: Balada de pájaros cantores y serpientes",
          )
          .slice(0, 6)
          .map((movie) => getMovieDetails(movie))
      );

      setMovieData(movies.filter((movie) => movie !== null));
    } catch (error) {
      console.error("Error al obtener datos de películas:", error);
    }
  };

  useEffect(() => {
    fetchMovieData();
  }, []); 

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: 3,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
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
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="carousel-container">
      <Slider className="carousel" {...settings}>
        {movieData.map((movie, index) => (
          <div key={index} className="movie-card">
            <img src={movie.image} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>
              <strong>Género:</strong> {movie.genre}
            </p>
            <p>
              <strong>Duración:</strong> {movie.duration} minutos
            </p>
            <ul>
              <strong>Funciones:</strong>
              {movie.showtimes.map((showtime, i) => (
                <li key={i}>{showtime}</li>
              ))}
            </ul>
            <div className="overlay">
              <Link className="button" to={"/admin/cartelera"}>
                Administrar cartelera
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
