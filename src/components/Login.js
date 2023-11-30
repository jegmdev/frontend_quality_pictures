import React, { useState } from 'react';
import '../css/Login.css'; 
import { Link } from 'react-router-dom';

const Login = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

 const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
 };

 return (
    <div className="login-container">
      <h1>INICIAR SESIÓN</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Correo electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p>¿No tienes cuenta? <Link className='Link' to='/registro'>Registrate aquí</Link></p>
        <button type="submit">INGRESAR</button>
      </form>
    </div>
 );
};

export default Login;