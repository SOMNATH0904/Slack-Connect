import { useState } from 'react';
import MessageForm from '../components/MessageForm';
import ScheduledList from '../components/ScheduledList';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [refreshFlag, setRefreshFlag] = useState(false);
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const triggerRefresh = () => {
    console.log("🆕 Refresh flag toggled");
    setRefreshFlag(prev => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('slack_token');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Top Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">
            Slack Connect Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <MessageForm onScheduleSuccess={triggerRefresh} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <ScheduledList refreshFlag={refreshFlag} />
        </div>
      </main>
    </div>
  );
}
