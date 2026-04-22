import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';  
import ReportModal from '../components/ReportModal';
import NotificationDropdown from '../components/NotificationDropdown';
import TicketSummary from '../components/TicketSummary';
import AccountDropdown from '../components/AccountDropdown';
import '../styles/UserDashboard.css';

// 1. Hapus variabel dummy 'tickets' yang lama

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

// Tambahan fungsi untuk menentukan warna aksen garis di sebelah kiri tiket
function getStatusBorderColor(status) {
    switch (status) {
        case 'In Progress': return '#3498db'; // Biru
        case 'Pending': return '#f39c12'; // Oranye
        case 'Resolved': return '#27ae60'; // Hijau
        default: return '#bdc3c7'; // Abu-abu
    }
}

export default function UserDashboard({ user, onLogout }) {
    const [showReport, setShowReport] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    
    // State yang tidak terpakai di komponen ini (karena dipindah ke Navbar) 
    // tetap saya biarkan agar tidak memicu error jika Anda masih menghubungkannya
    const [showNotifications, setShowNotifications] = useState(false);
    const [showAccount, setShowAccount] = useState(false);

    // 2. State untuk menampung data dari database
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // 3. Menarik data saat halaman dimuat
    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/tickets');
            const result = await response.json();

            if (response.ok) {
                setTickets(result.data);
            } else {
                console.error('Gagal mengambil data tiket');
            }
        } catch (error) {
            console.error('Kesalahan koneksi ke backend:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const closeAll = () => {
        setShowNotifications(false);
        setShowAccount(false);
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />
            
            <div className="dashboard-main">
                <Navbar user={user} onLogout={onLogout}/>

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
                                {/* 4. Render data secara dinamis dari state */}
                                {isLoading ? (
                                    <p style={{ padding: '20px', color: '#666', textAlign: 'center' }}>Memuat data tiket...</p>
                                ) : tickets.length === 0 ? (
                                    <p style={{ padding: '20px', color: '#666', textAlign: 'center' }}>Belum ada isu produksi yang dilaporkan.</p>
                                ) : (
                                    tickets.map((ticket) => (
                                        <div
                                            key={ticket.id}
                                            className="ticket-item"
                                            onClick={() => setSelectedTicket(ticket)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div 
                                                className="ticket-accent" 
                                                style={{ backgroundColor: getStatusBorderColor(ticket.status) }}
                                            ></div>
                                            <div className="ticket-content">
                                                <h3 className="ticket-title">{ticket.title}</h3>
                                                <p className="ticket-meta">
                                                    TK-{ticket.id} • {new Date(ticket.created_at).toLocaleDateString('id-ID')}
                                                </p>
                                            </div>
                                            <span className={`ticket-badge ${getStatusBadgeClass(ticket.status)}`}>
                                                {ticket.status}
                                            </span>
                                        </div>
                                    ))
                                )}
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
                onClose={() => {
                    setShowReport(false);
                    fetchTickets(); // 5. Otomatis refresh data setelah lapor
                }}
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