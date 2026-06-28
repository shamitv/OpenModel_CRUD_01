import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

function Layout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-canvas">
      <nav className="bg-surface border-b border-hairline px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-title-lg font-inter font-semibold">Survey Studio</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-body-sm">
            Welcome, <span className="font-semibold">{user?.username || 'User'}</span>
          </span>
          <button
            onClick={handleLogout}
            className="btn-secondary text-sm"
          >
            Logout
          </button>
        </div>
      </nav>
      <main className="px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
