import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Patient Portal Components & Pages
import { PatientSidebar } from './components/PatientSidebar';
import { PatientHeader } from './components/PatientHeader';
import Dashboard from './pages/Dashboard';
import AssessmentPage from './pages/AssessmentPage';
import ResultsPage from './pages/ResultsPage';
import ResultPage from './pages/ResultPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import PrivacyPage from './pages/PrivacyPage';
import ResearcherDashboard from './pages/ResearcherDashboard';
import AdminDashboard from './pages/AdminDashboard';

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
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      <PatientSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <PatientHeader />
        <main style={{ flex: 1, padding: '1.75rem 2rem', overflowY: 'auto' }}>
          <PageRouter />
        </main>
      </div>
    </div>
  );
}

// Root Route Redirect Handler: If authenticated, redirect to role dashboard; otherwise send to /login
const RootRedirect = () => {
  const { currentUser, isAuthenticated } = useAuth();

  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" replace />;
  }

  const role = (currentUser?.role || '').toLowerCase();

  if (role.includes('patient')) {
    return <Navigate to="/patient/dashboard" replace />;
  }
  if (role.includes('doctor') || role.includes('clinician')) {
    return <Navigate to="/clinician/dashboard" replace />;
  }
  if (role.includes('researcher')) {
    return <Navigate to="/researcher/dashboard" replace />;
  }
  if (role.includes('admin')) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Navigate to="/clinician/dashboard" replace />;
};

export function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Routes>
            {/* Root Route: Always redirect unauthenticated users to /login */}
            <Route path="/" element={<RootRedirect />} />

            {/* Authentication Routes - Always accessible */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Doctor / Clinician Workspace Protected Routes */}
            <Route
              path="/doctor/*"
              element={<Navigate to="/clinician/dashboard" replace />}
            />
            <Route
              path="/clinician"
              element={
                <ProtectedRoute allowedRoles={['Clinician', 'doctor', 'Doctor']}>
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

            {/* Patient Workspace Protected Routes */}
            <Route
              path="/patient/*"
              element={
                <ProtectedRoute allowedRoles={['patient', 'Patient', 'user', 'Clinician', 'doctor']}>
                  <PatientAppShell />
                </ProtectedRoute>
              }
            />

            {/* Researcher Workspace Protected Route */}
            <Route
              path="/researcher/*"
              element={
                <ProtectedRoute allowedRoles={['researcher', 'Researcher', 'admin']}>
                  <ResearcherDashboard />
                </ProtectedRoute>
              }
            />

            {/* Admin Workspace Protected Route */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute allowedRoles={['admin', 'Admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Fallback Catch-All Redirects to Root / */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
