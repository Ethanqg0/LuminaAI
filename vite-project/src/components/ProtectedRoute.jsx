import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const ProtectedRoute = ({ path, ...props }) => {
  const { token, setToken } = useAuth();

  useEffect(() => {
    // Function to check if the token is valid
    const checkToken = async () => {
      try {
        const response = await fetch('/verify-auth',
        {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.status === 401) {
          // If the server responds with a 401 status, log the user out
          setToken(null);
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkToken();
  }, [token, setToken]);

  return <Route path={path} element={token ? props.element : <Navigate to="/login" />} />;
};

export default ProtectedRoute;