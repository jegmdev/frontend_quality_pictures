import './App.css';
import Menu from './components/Menu';
import Profile from './components/Profile'
import SliderComponent from './components/SliderComponent';
import Carousel from './components/Carousel';

function App() {
  return (
    <div className="App">
      <div className='MainBanner'>
        <Menu />
        <Profile />
        <SliderComponent />
      </div>

      <div className='Carousel-Cartelera'>
        <h2>Estrenos</h2>
        <Carousel/>
      </div>
    </div>
  );
}

export default App;
