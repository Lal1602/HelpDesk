import '../styles/TicketSummary.css';

export default function TicketSummary({ isOpen, onClose, ticket }) {
    if (!isOpen || !ticket) return null;

    const priorityMap = {
        'In Progress': { label: 'Tinggi', color: '#e74c3c', icon: '▲' },
        'Pending': { label: 'Sedang', color: '#f39c12', icon: '●' },
        'Resolved': { label: 'Rendah', color: '#27ae60', icon: '▼' },
    };

    const categoryMap = {
        'TK-101': 'Render Farm',
        'TK-102': 'Software',
        'TK-103': 'Hardware',
        'TK-104': 'Software',
        'TK-105': 'License',
    };

    const assigneeMap = {
        'TK-101': 'Budi (Admin)',
        'TK-102': 'Andi (IT)',
        'TK-103': 'Sari (Support)',
        'TK-104': 'Budi (Admin)',
        'TK-105': 'Andi (IT)',
    };

    const dueDateMap = {
        'TK-101': '12 Mar',
        'TK-102': '15 Mar',
        'TK-103': '10 Mar',
        'TK-104': '18 Mar',
        'TK-105': '20 Mar',
    };

    const priority = priorityMap[ticket.status] || priorityMap['Pending'];
    const category = categoryMap[ticket.id] || 'Render Farm';
    const assignee = assigneeMap[ticket.id] || 'Budi (Admin)';
    const dueDate = dueDateMap[ticket.id] || '12 Mar';

    return (
        <>
            <div className="dropdown-backdrop" onClick={onClose} />
            <div className="ticket-summary-panel">
                {/* Header Info */}
                <div className="ts-header">
                    <div className="ts-meta-grid">
                        <span className="ts-meta-label">Kode Tiket</span>
                        <span className="ts-meta-value ts-code">{ticket.id}</span>
                        <span className="ts-meta-label">Status</span>
                        <span className="ts-meta-value ts-status" style={{ color: ticket.status === 'In Progress' ? '#0d9e8a' : ticket.status === 'Pending' ? '#f39c12' : '#27ae60' }}>
                            {ticket.status}
                        </span>
                        <span className="ts-meta-label">Prioritas</span>
                        <span className="ts-meta-value" style={{ color: priority.color, fontWeight: 600 }}>
                            {priority.icon} {priority.label}
                        </span>
                    </div>
                    <button className="ts-close" onClick={onClose}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Title */}
                <h3 className="ts-title">{ticket.title}</h3>
                <div className="ts-subtitle">
                    <span className="ts-project">Ocean Blue</span>
                    <span className="ts-reporter">Dilaporkan oleh Ahmad B.</span>
                    <span className="ts-time">{ticket.time}</span>
                </div>

                {/* Detail Cards */}
                <div className="ts-details">
                    <div className="ts-detail-card">
                        <span className="ts-detail-label">Kategori</span>
                        <span className="ts-detail-value">{category}</span>
                    </div>
                    <div className="ts-detail-card">
                        <span className="ts-detail-label">Assignee</span>
                        <span className="ts-detail-value">{assignee}</span>
                    </div>
                    <div className="ts-detail-card">
                        <span className="ts-detail-label">Due Date</span>
                        <span className="ts-detail-value">{dueDate}</span>
                    </div>
                </div>

                {/* Action Button */}
                <button className="ts-detail-btn">Lihat Detail</button>
            </div>
        </>
    );
}
