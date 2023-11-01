import React from 'react';

function CarteleraBtn() {
    const redirectToURL = () => {
      window.location.href = './Cartelera.js';
    };
  
    return (
      <button onClick={redirectToURL}>Cartelera</button>
    );
  }

  export default CarteleraBtn;