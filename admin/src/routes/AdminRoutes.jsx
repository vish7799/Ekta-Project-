import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { ServicesManager } from '../pages/ServicesManager';
import { ProjectsManager } from '../pages/ProjectsManager';
import { EnquiriesManager } from '../pages/EnquiriesManager';
import { ClientsManager } from '../pages/ClientsManager';
import { IndustriesManager } from '../pages/IndustriesManager';
import { TestimonialsManager } from '../pages/TestimonialsManager';
import { SettingsManager } from '../pages/SettingsManager';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-admin-950 flex items-center justify-center text-admin-400">Authenticating session...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/services"
        element={
          <ProtectedRoute>
            <ServicesManager />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <ProjectsManager />
          </ProtectedRoute>
        }
      />
      <Route
        path="/clients"
        element={
          <ProtectedRoute>
            <ClientsManager />
          </ProtectedRoute>
        }
      />
      <Route path="/industries" element={<ProtectedRoute><IndustriesManager /></ProtectedRoute>} />
      <Route path="/testimonials" element={<ProtectedRoute><TestimonialsManager /></ProtectedRoute>} />
      <Route
        path="/enquiries"
        element={
          <ProtectedRoute>
            <EnquiriesManager />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsManager />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
