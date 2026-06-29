import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import Layout from './layouts/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import SurveyBuilderPage from './pages/SurveyBuilderPage';
import SurveyPreviewPage from './pages/SurveyPreviewPage';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  const { user, token } = useAuthStore();

  useEffect(() => {
    if (token && !user) {
      // Refresh user data from localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        useAuthStore.getState().setUser(JSON.parse(storedUser));
      }
    }
  }, [token, user]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/builder"
          element={
            <ProtectedRoute>
              <SurveyBuilderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/builder/:id"
          element={
            <ProtectedRoute>
              <SurveyBuilderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/preview/:id"
          element={
            <SurveyPreviewPage />
          }
        />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
