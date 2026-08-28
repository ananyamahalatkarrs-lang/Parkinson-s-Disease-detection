import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Existing Patient Portal Components & Pages
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import AssessmentPage from './pages/AssessmentPage';
import ResultsPage from './pages/ResultsPage';
import ResultPage from './pages/ResultPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import PrivacyPage from './pages/PrivacyPage';

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

function PageRouter() {
  const { activePage } = useApp();
  switch (activePage) {
    case 'dashboard':  return <Dashboard />;
    case 'assessment': return <AssessmentPage />;
    case 'results':    return <ResultsPage />;
    case 'result':     return <ResultPage />;
    case 'history':    return <HistoryPage />;
    case 'profile':    return <ProfilePage />;
    case 'privacy':    return <PrivacyPage />;
    default:           return <Dashboard />;
  }
}

function PatientAppShell() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{
        flex: 1,
        overflowY: 'auto',
        background: '#f0f6ff',
      }}>
        <PageRouter />
      </main>
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Routes>
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

            {/* Patient Portal Routes */}
            <Route path="/patient/*" element={<PatientAppShell />} />
            <Route path="/" element={<PatientAppShell />} />

            {/* Fallback Catch-All */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
