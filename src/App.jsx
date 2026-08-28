import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import AssessmentPage from './pages/AssessmentPage';
import ResultsPage from './pages/ResultsPage';
import ResultPage from './pages/ResultPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import PrivacyPage from './pages/PrivacyPage';

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

function AppShell() {
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

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
