import React, { useState } from 'react';
import '../css/Reserva.css';
import ReservarSilla from './ReservarSilla';

const Reserva = () => {
 const [peli, setPeli] = useState('');
 const [fecha, setFecha] = useState('');
 const [hora, setHora] = useState('');
 const [cantidad, setCantidad] = useState(0);
 const [total, setTotal] = useState(0);

 const peliculas = ['Leo', 'Trolls 3: Todos juntos', 'Five Nights at Freddy'];
 const fechas = ['30/11/2023', '01/12/2023', '02/12/2023'];
 const horas = ['11:50', '13:40', '16:35', '17:30', '19:50', '21:10'];

 const seleccionarPeli = (e) => {
    setPeli(e.target.value);
 };

 const seleccionarFecha = (e) => {
    setFecha(e.target.value);
 };

 const seleccionarHora = (e) => {
    setHora(e.target.value);
 };

 const seleccionarCantidad = (e) => {
    setCantidad(e.target.value);
 };

 const calcularTotal = () => {
    const precio = 15;
    setTotal(precio * cantidad);
 };

 return (
    <div className="reserva">
      <h1>Reserva tu entrada</h1>

      <div class="contenedor">

        <div className="seccion-izquierda">

          <div className="campo">
            <label>Película:</label>
              <select value={peli} onChange={seleccionarPeli}>
                <option value="">Seleccione una película</option>
                {peliculas.map((p, index) => ( <option key={index} value={p}>{p}</option>))}
              </select>
          </div>

          <div className="campo">
            <label>Fecha:</label>
              <select value={fecha} onChange={seleccionarFecha}>
                <option value="">Seleccione una fecha</option>
                {fechas.map((f, index) => (<option key={index} value={f}>{f}</option>))}
              </select>
          </div>

          <div className="campo">
            <label>Hora:</label>
              <select value={hora} onChange={seleccionarHora}>
                <option value="">Seleccione una hora</option>
                {horas.map((h, index) => (<option key={index} value={h}>{h}</option>))}
              </select>
          </div>

          <div className="campo">
            <label>Cantidad de entradas:</label>
              <input type="number" value={cantidad} onChange={seleccionarCantidad} />
          </div>

          <button onClick={calcularTotal}>Calcular total</button>

          <div className="resultado">
            <p>Total: ${total.toFixed(3)}</p>
          </div>
        </div>
        
        <div className="seccion-derecha">
          <ReservarSilla/>
        </div>

      </div>

    </div>
 );
};

export default Reserva;