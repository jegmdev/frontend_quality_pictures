import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/Carousel.css";
import axios from "axios";
import { API_URL } from "../constants.ts";

const fetchData = async (url, params) => {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    throw error;
  }
};

const Carousel = () => {
  const [movieData, setMovieData] = useState([]);

  const fetchMovieData = async () => {
    try {
      const response = await fetchData(`${API_URL}/api/estrenos`);

      const movies = response.map((pelicula) => ({
        id: pelicula.id,
        title: pelicula.titulo,
        overview: pelicula.sinopsis,
        image: pelicula.imagen_promocional,
        showtimes: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"],
        genre: pelicula.genero,
        duration: pelicula.duracion,
      }));

      setMovieData(movies);
    } catch (error) {
      console.error("Error al obtener datos de películas:", error);
    }
  };

  useEffect(() => {
    fetchMovieData();
  }, []);

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
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="carousel-container">
      <Slider className="carousel" {...settings}>
        {movieData.slice(0, 6).map((movie, index) => (
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
              <div className="overlay">
                <Link className="button" to={`/pelicula/${movie.id}`}>
                  Reservar
                </Link>
              </div>
            </ul>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
