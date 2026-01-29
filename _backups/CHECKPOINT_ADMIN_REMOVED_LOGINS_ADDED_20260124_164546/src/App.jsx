import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AdminLayout from './layouts/AdminLayout';
import TeamLayout from './layouts/TeamLayout';
import Login from './pages/Login';
import Overview from './pages/admin/Overview';
import Recruiters from './pages/admin/Recruiters';
import Candidates from './pages/admin/Candidates';
import BusinessDevelopment from './pages/admin/BusinessDevelopment';
import Clients from './pages/admin/Clients';
import TeamDashboard from './pages/team/TeamDashboard';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Or a spinner

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to their appropriate dashboard if they try to access unauthorized routes
    return user.role === 'admin'
      ? <Navigate to="/admin/dashboard" replace />
      : <Navigate to="/team/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<Overview />} />
            <Route path="recruiters" element={<Recruiters />} />
            <Route path="candidates" element={<Candidates />} />
            <Route path="bd" element={<BusinessDevelopment />} />
            <Route path="clients" element={<Clients />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* Team Routes */}
          <Route path="/team" element={
            <ProtectedRoute allowedRoles={['team', 'master', 'manager', 'recruiter']}>
              <TeamLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<TeamDashboard />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
