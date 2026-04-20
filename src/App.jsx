import { useState } from 'react';
import { BrowserRouter as NavigationContainer, Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './screens/LandingPage';
import LoginPage from './screens/LoginPage';
import AdminPage from './screens/AdminPage';
import UserDashboard from './screens/UserDashboard';
import TiketProduksi from './screens/TiketProduksi';
import ProfilePage from './screens/ProfilePage';

function AppContent() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={<LandingPage />}
      />
      <Route
        path="/login"
        element={
          <LoginPage 
            onLogin={(user) => {
              setUser(user);
              if (user.role === 'admin') {
                navigate('/admin');
              } else {
                navigate('/dashboard');
              }
            }} 
          />
        }
      />
      <Route
        path="/admin"
        element={<AdminPage user={user} onLogout={() => { setUser(null); navigate('/'); }} />}
      />
      <Route
        path="/dashboard"
        element={<UserDashboard user={user} onLogout={() => { setUser(null); navigate('/'); }} />}
      />
      <Route
        path="/tiket-produksi"
        element={<TiketProduksi />}
      />
      <Route
        path="/profile"
        element={<ProfilePage user={user} onLogout={() => { setUser(null); navigate('/'); }} />}
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