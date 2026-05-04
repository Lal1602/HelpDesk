import { useState } from 'react';
import { SidebarProvider } from './contexts/SidebarContext';
import { BrowserRouter as NavigationContainer, Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './screens/LandingPage';
import LoginPage from './screens/LoginPage';
import AdminPage from './screens/AdminPage';
import UserDashboard from './screens/UserDashboard';
import TiketProduksi from './screens/TiketProduksi';
import ProfilePage from './screens/ProfilePage';
import ProjectPage from './screens/ProjectPage';
import ProjectDetailPage from './screens/ProjectDetailPage';
import JadwalSLAPage from './screens/JadwalSLAPage';
import RenderFarmPage from './screens/RenderFarmPage';
import PusatBantuanPage from './screens/PusatBantuanPage';

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
        element={<TiketProduksi user={user} onLogout={() => { setUser(null); navigate('/'); }} />}
      />
      <Route
        path="/profile"
        element={<ProfilePage user={user} onLogout={() => { setUser(null); navigate('/'); }} />}
      />
      <Route
        path="/proyek"
        element={<ProjectPage user={user} onLogout={() => { setUser(null); navigate('/'); }} />}
      />
      <Route
        path="/proyek/:id"
        element={<ProjectDetailPage user={user} onLogout={() => { setUser(null); navigate('/'); }} />}
      />
      <Route
        path="/jadwal-sla"
        element={<JadwalSLAPage user={user} onLogout={() => { setUser(null); navigate('/'); }} />}
      />
      <Route
        path="/render-farm"
        element={<RenderFarmPage user={user} onLogout={() => { setUser(null); navigate('/'); }} />}
      />
      <Route
        path="/pusat-panduan"
        element={<PusatBantuanPage user={user} onLogout={() => { setUser(null); navigate('/'); }} />}
      />
    </Routes>
  );
}

function App() {
  return (
    <NavigationContainer>
      <SidebarProvider>
        <AppContent />
      </SidebarProvider>
    </NavigationContainer>
  );
}

export default App;