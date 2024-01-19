import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage.jsx';
import App from './App.jsx';
import { AuthContextProvider, useAuth } from './contexts/AuthContext.jsx';

const AppRoutes = () => {
    const { token, setToken } = useAuth();

    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={token ? <App /> : <Navigate to="/login" />} />
        </Routes>
    );
};

const WrappedAppRoutes = () => (
    <AuthContextProvider>
        <Router>
            <AppRoutes />
        </Router>
    </AuthContextProvider>
);

export default WrappedAppRoutes;