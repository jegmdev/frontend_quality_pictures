import React, { useState } from 'react';
import '../css/ReservarSilla.css';

const ReservarSilla = () => {
 const [selectedSeats, setSelectedSeats] = useState([]);

const selectSeat = (row, seat) => {
 setSelectedSeats(prevSeats => {
    if (prevSeats.some(s => s.row === row && s.seat === seat)) {
      return prevSeats.filter(s => !(s.row === row && s.seat === seat));
    } else if (prevSeats.length < 5) {
      return [...prevSeats, { row, seat }];
    } else {
      return prevSeats;
    }
 });
};

 const isSeatSelected = (row, seat) => {
    return selectedSeats.some(s => s.row === row && s.seat === seat);
 };

 return (
    <div className="reservar-silla">
      {[...Array(5)].map((e, i) => (
        <div key={i} className="fila">
          {[...Array(15)].map((e, j) => (
            <div key={j} className={`silla ${isSeatSelected(i + 1, j + 1) ? 'seleccionada' : ''}`} onClick={() => selectSeat(i + 1, j + 1)}></div>
          ))}
        </div>
      ))}
      <button className="boton">Reservar</button>
    </div>
 );
};

export default ReservarSilla;