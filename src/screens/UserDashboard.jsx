import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import PageHeader from '../components/PageHeader';
import ReportModal from '../components/ReportModal';
import TicketSummary from '../components/TicketSummary';
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
    { id: '01', status: 'Rendering',    color: '#0d9e8a' },
    { id: '02', status: 'Rendering',    color: '#f39c12' },
    { id: '03', status: 'Idle',         color: '#bdc3c7' },
    { id: '04', status: 'Offline',      color: '#27ae60' },
    { id: '05', status: 'Rendering',    color: '#0d9e8a' },
    { id: '06', status: 'Maintenance',  color: '#f39c12' },
    { id: '07', status: 'Offline',      color: '#e74c3c' },
    { id: '08', status: 'Rendering',    color: '#f39c12' },
];

function getStatusBadgeClass(status) {
    switch (status) {
        case 'In Progress': return 'badge-in-progress';
        case 'Pending':     return 'badge-pending';
        case 'Resolved':    return 'badge-resolved';
        default:            return '';
    }
}

export default function UserDashboard({ user, onLogout }) {
    const [showReport, setShowReport]       = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <div className="dashboard-main">
                {/* ── Reusable Header ── */}
                <PageHeader
                    title="Dasbor Produksi"
                    breadcrumb="Dasbor"
                    user={user}
                    onLogout={onLogout}
                />

                {/* ── Dashboard Content ── */}
                <div className="dashboard-content">
                    {/* Left Column — Tickets */}
                    <div className="content-left">
                        <div className="tickets-card">
                            <div className="tickets-header">
                                <div>
                                    <h2 className="tickets-title">Isu Produksi Terbaru</h2>
                                    <p className="tickets-subtitle">Status perbaikan aset &amp; infrastruktur</p>
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
                                        <div className="ticket-accent" style={{ backgroundColor: ticket.borderColor }} />
                                        <div className="ticket-content">
                                            <h3 className="ticket-title">{ticket.title}</h3>
                                            <p className="ticket-meta">{ticket.id} • {ticket.time}</p>
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
                                        <span className="node-id" style={{ backgroundColor: node.color }}>
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
