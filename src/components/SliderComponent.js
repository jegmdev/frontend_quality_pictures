import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/Slider.css'; 

const sliderData = [
  {
    background: 'https://i.postimg.cc/tCFRZWbg/banner1home.webp',
    title: '¡Vive la magia en nuestras salas!',
  },
  {
    background: 'https://i.postimg.cc/W1jNMzpw/banner2home.webp',
    title: 'Sumérgete en el mundo del cine con nuestras proyecciones de alta calidad. ¡Donde cada película es una experiencia que no querrás perderte!',
  },
  {
    background: 'https://i.postimg.cc/523xpJ6d/banner3home.webp',
    title: 'De la pantalla al corazón: ven y vive la magia del cine en nuestra sala premium. Una explosión de emociones te espera en cada función. Wars',
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
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default SliderComponent;
