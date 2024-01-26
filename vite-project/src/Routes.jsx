import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage.jsx';
import App from './App.jsx';
import Dashboard from './components/Dashboard.jsx';
import { AuthContextProvider, useAuth } from './contexts/AuthContext.jsx';
import LandingPage from './components/LandingPage.jsx';
import Calendar from './components/Calendar.jsx';

const AppRoutes = () => {
    const { token, setToken } = useAuth();

    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/projects" element={token ? <App /> : <Navigate to="/login" />} />
            <Route path="/calendar" element={token ? <Calendar /> : <Navigate to="/login" />} />
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