import { BrowserRouter as NavigationContainer, Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './screens/LandingPage';
import LoginPage from './screens/LoginPage';
import AdminPage from './screens/AdminPage';

function AppContent() {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* <Route
        path="/"
        element={<LandingPage />}
      /> */}
      <Route
        path="/"
        element={<LoginPage onLogin={() => navigate('/admin')} />}
      />
      <Route
        path="/admin"
        element={<AdminPage onLogout={() => navigate('/')} />}
      />
    </Routes>
  );
}

function App() {
  return (
    <NavigationContainer>
      <AppContent />
    </NavigationContainer>
  );
}

export default App;