import React from 'react';

function LoginButton() {
  const redirectToURL = () => {
    window.location.href = 'http://localhost:3001';
  };

  return (
    <button onClick={redirectToURL}>Login</button>
  );
}

export default LoginButton;
