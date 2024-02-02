import { createContext, useContext, useState, useEffect } from 'react';
import { redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('email') || null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (token) { // TODO: fetch to backend to verify token
      setToken(token);
    }

    if (email) {
      setIsLoggedIn(email);
    }
  }, []);

  const handleLogin = async (email, password) => {
    setIsLoggedIn(email);
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Include the user's email and password
      });
  
      const data = await response.json();
  
      // Check if the response contains a token
      if (data.token) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', email);
      }
    } catch (error) {
      return error;
    }
  };

  const handleSignup = async (email, password, confirmedPassword) => {
    try {
      const response = await fetch('http://localhost:3000/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, confirmedPassword }), // Include the user's email and password
      })

      const data = await response.json();

      setIsLoggedIn(email);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', email);

      return data;
    } catch (error) {
        return error;
    }
  }

  const signOut = () => {
      setIsLoggedIn('');
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      setToken(null);
      redirect('/')
    };


  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, token, setToken, handleLogin, handleSignup, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};