import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NotificationDropdown from './NotificationDropdown';
import AccountDropdown from './AccountDropdown';
import '../styles/Navbar.css'; // Pastikan file ini tidak menimpa gaya dashboard-header

export default function Navbar({ pageTitle, user, onLogout }) {
    const location = useLocation();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showAccount, setShowAccount] = useState(false);

    const routeConfig = {
        '/dashboard': {
            title: 'Dasbor Produksi',
            breadcrumb: 'Dasbor'
        },
        '/tiket-produksi': {
            title: 'Manajemen Tiket',
            breadcrumb: 'Tiket Produksi'
        },
        '/profile': {
            title: 'Profil Pengguna',
            breadcrumb: 'Profil'
        },
        // Tambahkan rute lain di sini...
    };

    const currentRoute = routeConfig[location.pathname] || routeConfig['/dashboard'];

    // Mock data user (nantinya bisa diambil dari backend/auth)

    return (
        <header className="dashboard-header">
            <div className="header-left">
                <h1 className="header-title">{currentRoute.title}</h1>
                <div className="breadcrumb">
                    <span className="breadcrumb-item">Portal Studio</span>
                    <span className="breadcrumb-separator">&gt;</span>
                    <span className="breadcrumb-active">{currentRoute.breadcrumb}</span>
                </div>
            </div>
            
            <div className="header-right">
                {/* Tombol Notifikasi */}
                <div style={{ position: 'relative' }}>
                    <button 
                        className="header-icon-btn" 
                        onClick={() => setShowNotifications(!showNotifications)}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                    </button>
                    <NotificationDropdown 
                        isOpen={showNotifications} 
                        onClose={() => setShowNotifications(false)} 
                    />
                </div>

                {/* Profil User */}
                <div style={{ position: 'relative' }}>
                    <div className="user-profile" onClick={() => setShowAccount(!showAccount)}>
                        <div className="user-avatar">R</div>
                        <div className="user-info">
                            <span className="user-name">Rohman</span>
                            <span className="user-role">Lead Animator</span>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </div>
                    <AccountDropdown 
                        isOpen={showAccount} 
                        onClose={() => setShowAccount(false)} 
                        user={user}
                        onLogout={onLogout}
                    />
                </div>
            </div>
        </header>
    );
}