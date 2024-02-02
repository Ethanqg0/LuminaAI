// Third Party Libraries
import { 
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';

// Local COmponents and Contexts
import Calendar from './components/Calendar.jsx';
import ConfirmEmail from './components/ConfirmEmail.jsx';
import Dashboard from './components/Dashboard.jsx';
import LandingPage from './components/LandingPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import ProjectsPage from './components/ProjectsPage.jsx';
import SignupPage from './components/SignupPage.jsx';

import { AuthContextProvider, useAuth } from './contexts/AuthContext.jsx';
  

const AppRoutes = () => {
    const { token } = useAuth();

    /* 
        TODO: fetch backend route to verify token rather than merely see if a token exists, 
    might need to make token functions async for that
    */

    const renderIfAuthenticated = (component) => (token ? component : <Navigate to="/login" />);

    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/confirmEmail" element={<ConfirmEmail />} />
            <Route path="/dashboard" element={renderIfAuthenticated(<Dashboard />)} />
            <Route path="/projects" element={renderIfAuthenticated(<ProjectsPage />)} />
            <Route path="/calendar" element={renderIfAuthenticated(<Calendar />)} />
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