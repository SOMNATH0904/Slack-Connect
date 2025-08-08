import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');

    if (token) {
      // Store token first
      localStorage.setItem('slack_token', token);

      // Update global auth state
      setIsAuthenticated(true);

      // Small timeout to ensure context updates before navigation
      setTimeout(() => {
        navigate('/dashboard');
      }, 100); // You can increase to 200 if needed
    } else {
      navigate('/');
    }
  }, [navigate, setIsAuthenticated]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-600">Authorizing...</p>
    </div>
  );
}
