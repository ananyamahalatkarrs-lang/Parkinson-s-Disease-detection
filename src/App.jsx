import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Authentication Pages
import { Login } from './modules/Auth/pages/Login';
import { Signup } from './modules/Auth/pages/Signup';
import { ForgotPassword } from './modules/Auth/pages/ForgotPassword';
import { ResetPassword } from './modules/Auth/pages/ResetPassword';

// Clinician Module Layout & Pages
import { ClinicianLayout } from './modules/Clinician/components/ClinicianLayout';
import { DoctorDashboard } from './modules/Clinician/pages/DoctorDashboard';
import { PatientList } from './modules/Clinician/pages/PatientList';
import { PatientDetails } from './modules/Clinician/pages/PatientDetails';
import { AssessmentReview } from './modules/Clinician/pages/AssessmentReview';
import { PatientTrends } from './modules/Clinician/pages/PatientTrends';
import { FollowUpManagement } from './modules/Clinician/pages/FollowUpManagement';
import { ReportsPage } from './modules/Clinician/pages/ReportsPage';
import { ClinicianSettings } from './modules/Clinician/pages/ClinicianSettings';

const RootRedirect = () => {
  const { currentUser, isAuthenticated } = useAuth();
  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" replace />;
  }
  return <Navigate to="/clinician/dashboard" replace />;
};

export function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Default Root Redirect */}
          <Route path="/" element={<RootRedirect />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Doctor / Clinician Workspace Routes */}
          <Route
            path="/clinician"
            element={
              <ProtectedRoute allowedRoles={['Clinician']}>
                <ClinicianLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/clinician/dashboard" replace />} />
            <Route path="dashboard" element={<DoctorDashboard />} />
            <Route path="patients" element={<PatientList />} />
            <Route path="patients/:id" element={<PatientDetails />} />
            <Route path="assessments" element={<AssessmentReview />} />
            <Route path="trends" element={<PatientTrends />} />
            <Route path="followups" element={<FollowUpManagement />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<ClinicianSettings />} />
          </Route>

          {/* Fallback Catch-All */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
