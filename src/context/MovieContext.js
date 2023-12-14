// MovieContext.js
import React, { createContext, useContext, useState } from 'react';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const setMovieId = (id) => {
    setSelectedMovieId(id);
  };

  return (
    <MovieContext.Provider value={{ selectedMovieId, setMovieId }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext debe ser utilizado dentro de un proveedor de contexto MovieProvider");
  }
  return context;
};
