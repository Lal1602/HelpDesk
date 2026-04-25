import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import PageHeader from '../components/PageHeader';
import '../styles/ProfilePage.css';

export default function ProfilePage({ user, onLogout }) {
    const navigate = useNavigate();

    const userName = user?.email?.split('@')[0] || 'Rohman';
    const initials = (user?.email?.[0] || 'R').toUpperCase() + (user?.email?.split('@')[0]?.slice(-1) || 'F').toUpperCase();

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <div className="dashboard-main">
                {/* ── Reusable Header ── */}
                <PageHeader
                    title="Profil Saya"
                    breadcrumb="Profil"
                    user={user}
                    onLogout={onLogout}
                />

                {/* Profile Content */}
                <div className="profile-content">
                    <div className="profile-card">
                        {/* Back Button */}
                        <button className="profile-back" onClick={() => navigate('/dashboard')}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="19" y1="12" x2="5" y2="12" />
                                <polyline points="12 19 5 12 12 5" />
                            </svg>
                        </button>

                        {/* Profile Header */}
                        <div className="profile-header-section">
                            <div className="profile-avatar-large">
                                {initials}
                            </div>
                            <div className="profile-name-group">
                                <h2 className="profile-fullname">Rohman Farhan</h2>
                                <p className="profile-role">Lead Animator</p>
                            </div>
                        </div>

                        {/* Informasi Pribadi */}
                        <div className="profile-section">
                            <div className="profile-section-header">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                <h3>Informasi Pribadi</h3>
                            </div>

                            <div className="profile-info-grid">
                                <div className="profile-info-item">
                                    <span className="info-label">EMAIL</span>
                                    <span className="info-value">{user?.email || 'rohmanfarhan@gmail.com'}</span>
                                </div>
                                <div className="profile-info-item">
                                    <span className="info-label">LOKASI STUDIO</span>
                                    <span className="info-value">Jakarta, Lantai 4 (Pipeline Section)</span>
                                </div>
                                <div className="profile-info-item">
                                    <span className="info-label">NOMOR TELEPON</span>
                                    <span className="info-value">+62 812-3456-7890</span>
                                </div>
                                <div className="profile-info-item">
                                    <span className="info-label">ID KARYAWAN</span>
                                    <span className="info-value">AS-2024-001</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
