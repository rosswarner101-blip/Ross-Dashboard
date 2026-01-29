import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AdminLayout from './layouts/AdminLayout';
import TeamLayout from './layouts/TeamLayout';
import LoginSelector from './pages/Login'; // Renaming the old Login to selector for now, or I should rename the file.
// Actually, I'll keep reusing Login.jsx as the "Selector" page since I already modified it to have 3 buttons.
import MasterLogin from './pages/auth/MasterLogin';
import ManagerLogin from './pages/auth/ManagerLogin';
import RecruiterLogin from './pages/auth/RecruiterLogin';
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
          <Route path="/login" element={<LoginSelector />} />
          <Route path="/login/master" element={<MasterLogin />} />
          <Route path="/login/manager" element={<ManagerLogin />} />
          <Route path="/login/recruiter" element={<RecruiterLogin />} />

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
