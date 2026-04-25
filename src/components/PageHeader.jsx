import { useState } from 'react';
import NotificationDropdown from './NotificationDropdown';
import AccountDropdown from './AccountDropdown';
import '../styles/PageHeader.css';

/**
 * PageHeader — Reusable header component
 *
 * Props:
 *  - title       : string  — Judul halaman (e.g. "Dasbor Produksi")
 *  - breadcrumb  : string  — Teks breadcrumb aktif (e.g. "Dasbor")
 *  - user        : object  — { email } dari state App
 *  - onLogout    : fn      — Callback logout dari state App
 *
 * Usage:
 *  <PageHeader title="Tiket Produksi" breadcrumb="Tiket" user={user} onLogout={onLogout} />
 */
export default function PageHeader({ title, breadcrumb, user, onLogout }) {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showAccount, setShowAccount] = useState(false);

    const handleNotifClick = () => {
        setShowAccount(false);
        setShowNotifications((prev) => !prev);
    };

    const handleAccountClick = () => {
        setShowNotifications(false);
        setShowAccount((prev) => !prev);
    };

    const initials = [
        (user?.email?.[0] || 'R').toUpperCase(),
        (user?.email?.split('@')[0]?.slice(-1) || 'F').toUpperCase(),
    ].join('');

    const displayName = user?.email?.split('@')[0] || 'Rohman';

    return (
        <header className="page-header">
            {/* Left — Title & Breadcrumb */}
            <div className="page-header-left">
                <h1 className="page-header-title">{title}</h1>
                <div className="page-header-breadcrumb">
                    <span className="ph-breadcrumb-item">Portal Studio</span>
                    <span className="ph-breadcrumb-sep">›</span>
                    <span className="ph-breadcrumb-active">{breadcrumb}</span>
                </div>
            </div>

            {/* Right — Actions */}
            <div className="page-header-right">
                {/* Notification Bell */}
                <button
                    id="notif-btn"
                    className={`ph-icon-btn${showNotifications ? ' active' : ''}`}
                    title="Notifikasi"
                    onClick={handleNotifClick}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                    <span className="ph-notif-dot" />
                </button>

                {/* Notification Dropdown */}
                <NotificationDropdown
                    isOpen={showNotifications}
                    onClose={() => setShowNotifications(false)}
                />

                {/* User Profile Card */}
                <div
                    id="account-btn"
                    className={`ph-user-card${showAccount ? ' active' : ''}`}
                    onClick={handleAccountClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleAccountClick()}
                >
                    <div className="ph-user-avatar">{initials}</div>
                    <div className="ph-user-info">
                        <span className="ph-user-name">{displayName}</span>
                        <span className="ph-user-role">Lead Animator</span>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ph-chevron">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </div>

                {/* Account Dropdown */}
                <AccountDropdown
                    isOpen={showAccount}
                    onClose={() => setShowAccount(false)}
                    user={user}
                    onLogout={onLogout}
                />
            </div>
        </header>
    );
}
