import React, { createContext, useContext, useState, useEffect } from 'react';
import { redirect } from 'react-router-dom';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      setIsLoggedIn(); // set to user email
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
      console.error('Failed to login:', error);
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
      console.log(data)

      setIsLoggedIn(email);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', email);

      return data;
    } catch (error) {
      console.error('Failed to signup:', error);
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
