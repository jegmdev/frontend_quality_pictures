import React from "react";
import "../css/App.css";
import SliderComponent from "./SliderComponent";
import Carousel from "./Carousel";
import DefaultLayout from "../layout/DefaultLayout.tsx";

function Home() {
  return (
    <DefaultLayout>
      <div className="App">
        <div className="MainBanner">
          <SliderComponent />
        </div>

        <div className="Carousel-Cartelera">
          <h1>Estrenos</h1>
          <Carousel />
          <br></br>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Home;
