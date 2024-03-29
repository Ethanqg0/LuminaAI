import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleLogin(formData.email, formData.password);
      // Reset the form values
      setFormData({
        email: '',
        password: '',
      });
      navigate('/dashboard')
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignupRedirect = () => {
    navigate('/signup')
  }

  return (
    <div className="flex items-center min-h-screen bg-white">
      <div className="container mx-auto">
        <div className="max-w-md mx-auto my-10">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-gray-900">Sign in</h1>
            <p className="text-gray-900 ">Sign in to access your account</p>
          </div>
          <div className="m-7">
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm text-gray-900">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="you@company.com"
                  className="w-full px-3 py-2 placeholder-gray-400 border border-black rounded-md focus:outline-none focus:ring focus:border-indigo-800"
                  onChange={handleInputChange}
                  value={formData.email}
                />
              </div>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-sm text-gray-800">Password</label>
                  <a href="#!" className="text-sm text-gray-800 focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300">Forgot password?</a>
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your Password"
                  className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 border-black"
                  onChange={handleInputChange}
                  value={formData.password}
                />
              </div>
              <div className="mb-6">
                <button type="submit" className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none">Sign in</button>
              </div>
              <p onClick={handleSignupRedirect} onSubmit={handleSignupRedirect} className="text-sm text-center text-gray-400">Don't have an account yet? <a className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800">Sign up</a>.</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
