import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState('');
  const [token, setToken] = useState(null);

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
            // Set the token in your component state or use a state management solution (e.g., Redux)
            setToken(data.token);
            console.log(data.token);
            setIsLoggedIn(email);
            console.log("should print the token")
          } else {
            console.error('Login failed:', data.error);
          }
        } catch (error) {
          console.error('Error during login:', error);
        }
      };

    const signOut = () => {
        setIsLoggedIn('');
        setToken(null);
    };


  return (
    <AuthContext.Provider value={{ isLoggedIn, token, handleLogin, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
