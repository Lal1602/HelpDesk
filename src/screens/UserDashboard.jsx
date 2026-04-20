import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ReportModal from '../components/ReportModal';
import NotificationDropdown from '../components/NotificationDropdown';
import TicketSummary from '../components/TicketSummary';
import AccountDropdown from '../components/AccountDropdown';
import '../styles/UserDashboard.css';

const tickets = [
    {
        id: 'TK-101',
        title: 'Node Render Farm 04 & 07 Offline',
        time: '2 jam lalu',
        status: 'In Progress',
        statusColor: '#e67e22',
        borderColor: '#e74c3c',
    },
    {
        id: 'TK-102',
        title: 'Update Plugin Redshift 3.5 di Semua Workstation',
        time: '5 jam lalu',
        status: 'Pending',
        statusColor: '#f39c12',
        borderColor: '#f39c12',
    },
    {
        id: 'TK-103',
        title: 'Kalibrasi Warna Monitor Cintiq 24 Pro',
        time: '1 hari lalu',
        status: 'Resolved',
        statusColor: '#27ae60',
        borderColor: '#27ae60',
    },
    {
        id: 'TK-104',
        title: 'Error Sinkronisasi Shotgrid / Asset Library',
        time: '3 jam lalu',
        status: 'In Progress',
        statusColor: '#e67e22',
        borderColor: '#3498db',
    },
    {
        id: 'TK-105',
        title: 'License Arnold Renderer Kadaluarsa',
        time: '30 mnt lalu',
        status: 'Pending',
        statusColor: '#f39c12',
        borderColor: '#e74c3c',
    },
];

const renderFarmNodes = [
    { id: '01', status: 'Rendering', color: '#0d9e8a' },
    { id: '02', status: 'Rendering', color: '#f39c12' },
    { id: '03', status: 'Idle', color: '#bdc3c7' },
    { id: '04', status: 'Offline', color: '#27ae60' },
    { id: '05', status: 'Rendering', color: '#0d9e8a' },
    { id: '06', status: 'Maintenance', color: '#f39c12' },
    { id: '07', status: 'Offline', color: '#e74c3c' },
    { id: '08', status: 'Rendering', color: '#f39c12' },
];

function getStatusBadgeClass(status) {
    switch (status) {
        case 'In Progress': return 'badge-in-progress';
        case 'Pending': return 'badge-pending';
        case 'Resolved': return 'badge-resolved';
        default: return '';
    }
}

export default function UserDashboard({ user, onLogout }) {
    const [showReport, setShowReport] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showAccount, setShowAccount] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);

    // Close all dropdowns
    const closeAll = () => {
        setShowNotifications(false);
        setShowAccount(false);
    };

    const handleNotifClick = () => {
        setShowAccount(false);
        setShowNotifications(!showNotifications);
    };

    const handleAccountClick = () => {
        setShowNotifications(false);
        setShowAccount(!showAccount);
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <div className="dashboard-main">
                {/* Top Header */}
                <header className="dashboard-header">
                    <div className="header-left">
                        <h1 className="header-title">Dasbor Produksi</h1>
                        <div className="breadcrumb">
                            <span className="breadcrumb-item">Portal Studio</span>
                            <span className="breadcrumb-separator">&gt;</span>
                            <span className="breadcrumb-active">Dasbor</span>
                        </div>
                    </div>
                    <div className="header-right" style={{ position: 'relative' }}>
                        {/* Notification Bell */}
                        <button
                            className={`header-icon-btn ${showNotifications ? 'active' : ''}`}
                            title="Notifikasi"
                            onClick={handleNotifClick}
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                            <span className="notif-dot"></span>
                        </button>

                        {/* Notification Dropdown */}
                        <NotificationDropdown
                            isOpen={showNotifications}
                            onClose={() => setShowNotifications(false)}
                        />

                        {/* User Profile */}
                        <div
                            className={`user-profile ${showAccount ? 'active' : ''}`}
                            onClick={handleAccountClick}
                        >
                            <div className="user-avatar">
                                {(user?.email?.[0] || 'R').toUpperCase()}{(user?.email?.split('@')[0]?.slice(-1) || 'F').toUpperCase()}
                            </div>
                            <div className="user-info">
                                <span className="user-name">{user?.email?.split('@')[0] || 'Rohman'}</span>
                                <span className="user-role">Lead Animator</span>
                            </div>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

                {/* Dashboard Content */}
                <div className="dashboard-content">
                    {/* Left Column - Tickets */}
                    <div className="content-left">
                        <div className="tickets-card">
                            <div className="tickets-header">
                                <div>
                                    <h2 className="tickets-title">Isu Produksi Terbaru</h2>
                                    <p className="tickets-subtitle">Status perbaikan aset & infrastruktur</p>
                                </div>
                                <button className="see-all-btn">Lihat Semua</button>
                            </div>

                            <div className="tickets-list">
                                {tickets.map((ticket) => (
                                    <div
                                        key={ticket.id}
                                        className="ticket-item"
                                        onClick={() => setSelectedTicket(ticket)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="ticket-accent" style={{ backgroundColor: ticket.borderColor }}></div>
                                        <div className="ticket-content">
                                            <h3 className="ticket-title">{ticket.title}</h3>
                                            <p className="ticket-meta">
                                                {ticket.id} • {ticket.time}
                                            </p>
                                        </div>
                                        <span className={`ticket-badge ${getStatusBadgeClass(ticket.status)}`}>
                                            {ticket.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="content-right">
                        {/* Lapor Kendala Baru */}
                        <div className="report-card" onClick={() => setShowReport(true)}>
                            <div className="report-card-inner">
                                <div className="report-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="8" x2="12" y2="16" />
                                        <line x1="8" y1="12" x2="16" y2="12" />
                                    </svg>
                                </div>
                                <div className="report-text">
                                    <h3>Lapor Kendala Baru</h3>
                                    <p>Laporkan permasalahan yang menghambat jalannya produksi</p>
                                </div>
                            </div>
                        </div>

                        {/* Status Render Farm */}
                        <div className="render-farm-card">
                            <div className="render-farm-header">
                                <h3>Status Render Farm</h3>
                                <button className="detail-btn">Detail</button>
                            </div>
                            <div className="render-farm-grid">
                                {renderFarmNodes.map((node) => (
                                    <div key={node.id} className="render-node">
                                        <span
                                            className="node-id"
                                            style={{ backgroundColor: node.color }}
                                        >
                                            {node.id}
                                        </span>
                                        <span className="node-status">{node.status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Troubleshooting Tips */}
                        <div className="tips-card">
                            <h3 className="tips-title">
                                <span className="tips-icon">⚙️</span> Troubleshooting Tips
                            </h3>
                            <p className="tips-text">
                                Kirim cache ke SSD-Storage untuk mempercepat render farm hingga 40%. 
                                Hindari render langsung dari NAS saat peak hours (10.00–16.00).
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Report Modal */}
            <ReportModal
                isOpen={showReport}
                onClose={() => setShowReport(false)}
            />

            {/* Ticket Summary Popup */}
            <TicketSummary
                isOpen={!!selectedTicket}
                onClose={() => setSelectedTicket(null)}
                ticket={selectedTicket}
            />
        </div>
    );
}
