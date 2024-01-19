import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage.jsx';
import App from './App.jsx';
import { AuthContextProvider } from './contexts/AuthContext.jsx';

const AppRoutes = () => {
    return (
        <Router>
            <AuthContextProvider>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={<App />} />
            </Routes>
            </AuthContextProvider>
        </Router>
    );
};

export default AppRoutes;