import React from "react";
import "../css/App.css";
import SliderComponent from "./SliderComponent";
import Carousel from "./Carousel";
import ImageBanner from "./imageBanner.js"
import Footer from "./footer"
import AdminLayout from "../layout/AdminLayout.tsx";

function Home() {
  return (
    <AdminLayout>
      <div className="App">
        <div className="MainBanner">
          <SliderComponent />
        </div>

        <div className="Carousel-Cartelera">
          <h1>Cartelera</h1>
          <Carousel />
          <br></br>
        </div>

        <div className="banner">
          <ImageBanner />
        </div>

        <div className="Carousel-Estrenos">
          <h1>Estrenos</h1>
          <Carousel />
          <br></br>
          <br></br>
        </div>

        <Footer/>
      </div>
    </AdminLayout>
  );
}

export default Home;
