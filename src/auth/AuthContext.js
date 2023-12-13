// AuthContext.js
import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userType, setUserType] = useState(null);

  const login = (newUserType) => {
    setUserType(newUserType);
  };

  const logout = () => {
    setUserType(null);
  };

  return (
    <AuthContext.Provider value={{ userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
