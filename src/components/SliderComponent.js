import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.css'; // Asegúrate de tener un archivo CSS para los estilos del slider

const sliderData = [
  {
    background: 'https://cdn.colombia.com/sdi/2022/07/26/ant-man-and-the-wasp-quantumania-cambiara-universo-marvel-kang-1051448.jpg',
    title: 'Ant Man and The Wasp',
    description: 'Lorem ipsum',
  },
  {
    background: 'https://www.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2023/02/estos-son-todos-posteres-super-mario-bros-pelicula-han-salido-ahora-2953576.jpg',
    title: 'Mario Bros',
    description: 'Lorem ipsum',
  },
  {
    background: 'https://static.posters.cz/image/hp/75998.jpg',
    title: 'Star Wars',
    description: 'Lorem ipsum',
  },
];

const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Cambia cada 5 segundos
    arrows: false, 
  };

  return (
    <Slider {...settings} className="slider">
      {sliderData.map((slide, index) => (
        <div key={index} className="slider-slide">
          <div className="slider-slide-overlay"></div> {/* Capa transparente */}
          <div
            className="slider-slide-background"
            style={{ backgroundImage: `url(${slide.background})` }}
          />
          <div className="slider-content">
            <h2>{slide.title}</h2>
            <p>{slide.description}</p>
            <button>Comprar tickets</button>
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default SliderComponent;
