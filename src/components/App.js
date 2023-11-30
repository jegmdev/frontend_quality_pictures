import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '../css/App.css';
import Menu from './Menu';
import Cartelera from './Cartelera';
import Reserva from './Reserva';
import Login from './Login';
import Home from './Home';
import Registro from './Registro'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route index element={<Home />} />
          <Route path="cartelera" element={<Cartelera />} />
          <Route path="reserva" element={<Reserva />} />
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Registro />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
