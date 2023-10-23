import './App.css';
import LoginButton from './components/LoginButton'
import Menu from './components/Menu';
import Profile from './components/Profile'
import SliderComponent from './components/SliderComponent';

function App() {
  return (
    <div className="App">
      <Menu />
      <Profile />
      <SliderComponent />
    </div>
  );
}

export default App;
