import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import PageHeader from '../components/PageHeader';
import ReportModal from '../components/ReportModal';
import '../styles/TiketProduksi.css';

const tickets = [
    {
        id: 'TK-101',
        title: 'Node Render Farm 04 & 07 Offline',
        meta: 'Ocean Blue • 2 jam lalu',
        category: 'Render Farm',
        priority: 'Tinggi',
        status: 'In Progress',
        due: '16 Mar',
    },
    {
        id: 'TK-102',
        title: 'Update Plugin Redshift 3.5 di Semua Workstation',
        meta: 'Brand X • 5 jam lalu',
        category: 'Software',
        priority: 'Sedang',
        status: 'Pending',
        due: '15 April',
    },
    {
        id: 'TK-103',
        title: 'Kalibrasi Warna Monitor Cintiq 24 Pro',
        meta: 'Internal • 1 hari lalu',
        category: 'Hardware',
        priority: 'Rendah',
        status: 'Resolved',
        due: '8 April',
    },
    {
        id: 'TK-104',
        title: 'Error Sinkronisasi Shotgrid / Asset Library',
        meta: 'Ocean Blue • 3 jam lalu',
        category: 'Pipeline',
        priority: 'Tinggi',
        status: 'In Progress',
        due: '13 Mar',
    },
    {
        id: 'TK-105',
        title: 'License Arnold Renderer Kadaluarsa',
        meta: 'Brand X • 30 mnt lalu',
        category: 'Software',
        priority: 'Tinggi',
        status: 'Pending',
        due: '13 Mar',
    },
];

const statuses = ['Semua', 'In Progress', 'Pending', 'Resolved'];

function getStatusClass(status) {
    switch (status) {
        case 'In Progress': return 'status-chip in-progress';
        case 'Pending':     return 'status-chip pending';
        case 'Resolved':    return 'status-chip resolved';
        default:            return 'status-chip';
    }
}

function getPriorityClass(priority) {
    switch (priority) {
        case 'Tinggi': return 'priority-chip high';
        case 'Sedang': return 'priority-chip medium';
        case 'Rendah': return 'priority-chip low';
        default:       return 'priority-chip';
    }
}

function getPriorityIcon(priority) {
    switch (priority) {
        case 'Tinggi': return '▲';
        case 'Sedang': return '◆';
        case 'Rendah': return '▼';
        default:       return '';
    }
}

function isDueOverdue(due) {
    return due.toLowerCase().includes('mar');
}

export default function TiketProduksi({ user, onLogout }) {
    const [activeFilter, setActiveFilter] = useState('Semua');
    const [searchQuery, setSearchQuery] = useState('');
    const [showReport, setShowReport] = useState(false);

    const filtered = tickets.filter((t) => {
        const matchStatus = activeFilter === 'Semua' || t.status === activeFilter;
        const matchSearch =
            t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.id.toLowerCase().includes(searchQuery.toLowerCase());
        return matchStatus && matchSearch;
    });

    return (
        <div className="tiket-produksi-layout">
            <Sidebar />

            <div className="tiket-produksi-main">
                {/* ── Reusable Header ── */}
                <PageHeader
                    title="Tiket Produksi"
                    breadcrumb="Tiket"
                    user={user}
                    onLogout={onLogout}
                />

                {/* ── Main Panel ── */}
                <section className="tiket-produksi-panel">

                    {/* Filter Toolbar */}
                    <div className="filter-toolbar">
                        <div className="filter-pill-group">
                            {statuses.map((status) => (
                                <button
                                    key={status}
                                    className={`filter-pill${activeFilter === status ? ' active' : ''}`}
                                    onClick={() => setActiveFilter(status)}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>

                        <div className="tiket-toolbar-right">
                            <div className="search-wrapper">
                                <span className="search-icon">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8" />
                                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                    </svg>
                                </span>
                                <input
                                    className="search-input"
                                    type="text"
                                    placeholder="Cari tiket…"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button
                                className="new-ticket-btn"
                                onClick={() => setShowReport(true)}
                            >
                                + Tiket Baru
                            </button>
                        </div>
                    </div>

                    {/* Table Card */}
                    <div className="tiket-table-card">
                        <div className="tiket-table-wrapper">
                            <table className="tiket-table">
                                <thead>
                                    <tr>
                                        <th>TIKET</th>
                                        <th>KATEGORI</th>
                                        <th>PRIORITAS</th>
                                        <th>STATUS</th>
                                        <th>DUE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="tiket-empty">
                                                Tidak ada tiket yang sesuai.
                                            </td>
                                        </tr>
                                    ) : (
                                        filtered.map((ticket) => (
                                            <tr key={ticket.id}>
                                                <td>
                                                    <div className="ticket-cell-title">{ticket.title}</div>
                                                    <div className="ticket-cell-meta">
                                                        {ticket.id} • {ticket.meta.split(' • ')[0]} • {ticket.meta.split(' • ')[1]}
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="category-chip">{ticket.category}</span>
                                                </td>
                                                <td>
                                                    <span className={getPriorityClass(ticket.priority)}>
                                                        <span className="chip-icon">{getPriorityIcon(ticket.priority)}</span>
                                                        {ticket.priority}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className={getStatusClass(ticket.status)}>
                                                        {ticket.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className={`due-text${isDueOverdue(ticket.due) ? ' overdue' : ''}`}>
                                                        {ticket.due}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>

            {/* Report Modal */}
            <ReportModal
                isOpen={showReport}
                onClose={() => setShowReport(false)}
            />
        </div>
    );
}