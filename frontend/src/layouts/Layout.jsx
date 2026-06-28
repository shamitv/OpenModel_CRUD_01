import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const NAV_ITEMS = [
  { path: '/', label: 'Surveys', icon: '📋' },
  { path: '/builder', label: 'Builder', icon: '✏️' },
  { path: '/analytics', label: 'Analytics', icon: '📊' },
];

function Layout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavClick = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-canvas flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-surface border-r border-hairline transform transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } flex flex-col`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-hairline">
          <h1 className="text-xl font-semibold text-ink font-inter">Survey Studio</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md text-sm transition-colors ${
                  isActive
                    ? 'bg-primary-soft text-primary font-semibold'
                    : 'text-body hover:bg-surface-muted'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-hairline">
          <div className="flex items-center space-x-3 px-4 py-2">
            <div className="w-8 h-8 bg-primary-soft rounded-full flex items-center justify-center text-sm font-semibold text-primary">
              {user?.username?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-ink truncate">{user?.username || 'User'}</p>
              <p className="text-xs text-muted truncate">{user?.email || ''}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs text-muted hover:text-error transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-surface border-b border-hairline flex items-center px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md hover:bg-surface-muted mr-4"
          >
            <svg className="w-5 h-5 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold text-ink">Dashboard</h2>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
