import React from 'react';
import '../css/App.css';
import SliderComponent from './SliderComponent';
import Carousel from './Carousel';

function App() {
  return (
    <div className="App">
      <div className="MainBanner">
        <SliderComponent />
      </div>

      <div className="Carousel-Cartelera">
        <h2>Estrenos</h2>
        <Carousel />
      </div>
    </div>
  );
}

export default App;
