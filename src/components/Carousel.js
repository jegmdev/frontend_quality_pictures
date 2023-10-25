import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';

const movieData = [
  {
    title: 'Ant Man and The Wasp',
    image: 'https://cdn.colombia.com/sdi/2022/07/26/ant-man-and-the-wasp-quantumania-cambiara-universo-marvel-kang-1051448.jpg',
    showtimes: ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM'],
    trailerLink: 'https://www.youtube.com/watch?v=aJYWJR7IKQA&pp=ygUcdHJhaWxlciBhbnQgbWFuIGFuZCB0aGUgd2FzcA%3D%3D',
    ticketLink: 'ticket1-link',
  },
  {
    title: 'Mario Bros',
    image: 'https://www.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2023/02/estos-son-todos-posteres-super-mario-bros-pelicula-han-salido-ahora-2953576.jpg',
    showtimes: ['11:00 AM', '2:00 PM', '5:00 PM', '8:00 PM'],
    trailerLink: 'https://www.youtube.com/watch?v=SvJwEiy2Wok&pp=ygUSdHJhaWxlciBtYXJpbyBicm9z',
    ticketLink: 'ticket2-link',
  },
  {
    title: 'Star Wars',
    image: 'https://static.posters.cz/image/hp/75998.jpg',
    showtimes: ['11:00 AM', '2:00 PM', '5:00 PM', '8:00 PM'],
    trailerLink: 'https://www.youtube.com/watch?v=n1CUHjrc9Sc&pp=ygUTdHJhaWxlciBzdGFyIHdhcnMgMQ%3D%3D',
    ticketLink: 'ticket2-link',
  },
  {
    title: 'Oppenheimer',
    image: 'https://cartelescine.files.wordpress.com/2022/07/oppenheimerbanner.jpg',
    showtimes: ['11:00 AM', '2:00 PM', '5:00 PM', '8:00 PM'],
    trailerLink: 'https://www.youtube.com/watch?v=gMPEbJQun68&pp=ygUddHJhaWxlciBvcHBlbmhlaW1lciBlc3Bhw7FvbCA%3D',
    ticketLink: 'ticket2-link',
  },
  // Agrega más películas según sea necesario
];

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Muestra 4 tarjetas por vista
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // Cambia a 2 tarjetas por vista en pantallas más pequeñas
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2, // Cambia a 3 tarjetas por vista en pantallas más grandes
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
            <ul>
              {movie.showtimes.map((showtime, i) => (
                <li key={i}>{showtime}</li>
              ))}
            </ul>
            <div className="overlay">
              <a href={movie.trailerLink} className="button">Ver tráiler</a>
              <a href={movie.ticketLink} className="button">Comprar ticket</a>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
