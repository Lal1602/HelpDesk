import Sidebar from '../components/Sidebar';
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
        case 'In Progress':
            return 'status-chip in-progress';
        case 'Pending':
            return 'status-chip pending';
        case 'Resolved':
            return 'status-chip resolved';
        default:
            return 'status-chip';
    }
}

function getPriorityClass(priority) {
    switch (priority) {
        case 'Tinggi':
            return 'priority-chip high';
        case 'Sedang':
            return 'priority-chip medium';
        case 'Rendah':
            return 'priority-chip low';
        default:
            return 'priority-chip';
    }
}

/* ─────────────────────────────────────────────
   STYLES — terpisah dari export default function
───────────────────────────────────────────── */
const styles = {
    /* Layout */
    dashboardLayout: {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#f4f6f9',
        fontFamily: "'Segoe UI', system-ui, sans-serif",
    },
    main: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },

    /* ── Header ── */
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '28px 36px 24px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #ebebeb',
    },
    titleGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    title: {
        margin: 0,
        fontSize: '26px',
        fontWeight: '700',
        color: '#1a1e2e',
        lineHeight: 1.2,
    },
    breadcrumb: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '13px',
        color: '#aab0be',
    },
    breadcrumbSeparator: {
        color: '#aab0be',
        fontSize: '14px',
    },
    breadcrumbActive: {
        color: '#00b894',
        fontWeight: '600',
    },

    /* User info (top-right) */
    headerRight: {
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
    },
    bellWrapper: {
        position: 'relative',
        width: '42px',
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1.5px solid #e8e8e8',
        borderRadius: '10px',
        backgroundColor: '#fff',
        cursor: 'pointer',
    },
    bellDot: {
        position: 'absolute',
        top: '8px',
        right: '9px',
        width: '7px',
        height: '7px',
        borderRadius: '50%',
        backgroundColor: '#e74c3c',
        border: '1.5px solid #fff',
    },
    userCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '7px 14px 7px 7px',
        border: '1.5px solid #e8e8e8',
        borderRadius: '10px',
        backgroundColor: '#fff',
        cursor: 'pointer',
        minWidth: '170px',
    },
    userAvatar: {
        width: '34px',
        height: '34px',
        borderRadius: '8px',
        backgroundColor: '#00b894',
        color: '#fff',
        fontWeight: '700',
        fontSize: '13px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    userName: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#1a1e2e',
        lineHeight: 1.3,
    },
    userRole: {
        fontSize: '12px',
        color: '#aab0be',
        lineHeight: 1.3,
    },
    chevron: {
        fontSize: '12px',
        color: '#aab0be',
    },

    /* ── Panel ── */
    panel: {
        padding: '28px 36px',
        flex: 1,
    },

    /* Toolbar row: filter pills + search + new button */
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '22px',
        gap: '12px',
        flexWrap: 'wrap',
    },
    filterPillGroup: {
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
    },
    filterPill: {
        padding: '9px 20px',
        borderRadius: '8px',
        border: '1.5px solid #e0e0e0',
        backgroundColor: '#fff',
        cursor: 'pointer',
        fontWeight: '500',
        fontSize: '14px',
        color: '#555',
        transition: 'all 0.15s',
    },
    filterPillActive: {
        padding: '9px 20px',
        borderRadius: '8px',
        border: '1.5px solid #00b894',
        backgroundColor: '#00b894',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '14px',
        color: '#fff',
    },
    toolbarRight: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    searchWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '9px 16px',
        border: '1.5px solid #e0e0e0',
        borderRadius: '8px',
        backgroundColor: '#fff',
    },
    searchIcon: {
        fontSize: '14px',
        color: '#bbb',
        flexShrink: 0,
    },
    searchInput: {
        border: 'none',
        outline: 'none',
        fontSize: '14px',
        color: '#555',
        width: '180px',
        backgroundColor: 'transparent',
    },
    newTicketBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '10px 22px',
        borderRadius: '8px',
        backgroundColor: '#00b894',
        color: '#fff',
        border: 'none',
        fontWeight: '600',
        fontSize: '14px',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
    },

    /* ── Table Card ── */
    tableCard: {
        backgroundColor: '#fff',
        borderRadius: '12px',
        border: '1px solid #ebebeb',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        padding: '14px 22px',
        textAlign: 'left',
        fontSize: '11px',
        fontWeight: '700',
        color: '#b0b8c8',
        letterSpacing: '0.07em',
        borderBottom: '1.5px solid #f0f0f0',
        whiteSpace: 'nowrap',
    },
    td: {
        padding: '18px 22px',
        borderBottom: '1px solid #f5f6fa',
        verticalAlign: 'middle',
    },
    ticketCellTitle: {
        fontWeight: '600',
        fontSize: '15px',
        color: '#1a1e2e',
        marginBottom: '5px',
        lineHeight: 1.4,
    },
    ticketCellMeta: {
        fontSize: '12px',
        color: '#b0b8c8',
        lineHeight: 1.4,
    },

    /* Category chip */
    categoryChip: {
        display: 'inline-block',
        padding: '5px 13px',
        borderRadius: '6px',
        backgroundColor: '#f3f4f8',
        color: '#555',
        fontSize: '13px',
        fontWeight: '500',
        whiteSpace: 'nowrap',
    },

    /* Priority chips */
    priorityHigh: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        fontSize: '13px',
        fontWeight: '600',
        color: '#e74c3c',
    },
    priorityMedium: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        fontSize: '13px',
        fontWeight: '600',
        color: '#e67e22',
    },
    priorityLow: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        fontSize: '13px',
        fontWeight: '600',
        color: '#555',
    },

    /* Status chips */
    statusInProgress: {
        display: 'inline-block',
        padding: '5px 14px',
        borderRadius: '7px',
        backgroundColor: '#d6eaff',
        color: '#2980b9',
        fontSize: '13px',
        fontWeight: '600',
        whiteSpace: 'nowrap',
    },
    statusPending: {
        display: 'inline-block',
        padding: '5px 14px',
        borderRadius: '7px',
        backgroundColor: '#fff3cd',
        color: '#d68910',
        fontSize: '13px',
        fontWeight: '600',
        whiteSpace: 'nowrap',
    },
    statusResolved: {
        display: 'inline-block',
        padding: '5px 14px',
        borderRadius: '7px',
        backgroundColor: '#d4f5e2',
        color: '#1e8449',
        fontSize: '13px',
        fontWeight: '600',
        whiteSpace: 'nowrap',
    },

    /* Due date */
    dueOverdue: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#e74c3c',
        whiteSpace: 'nowrap',
    },
    dueNormal: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#888',
        whiteSpace: 'nowrap',
    },
};

/* Helpers */
function getPriorityStyle(priority) {
    switch (priority) {
        case 'Tinggi':  return { style: styles.priorityHigh,   icon: '▲' };
        case 'Sedang':  return { style: styles.priorityMedium, icon: '◆' };
        case 'Rendah':  return { style: styles.priorityLow,    icon: '▼' };
        default:        return { style: styles.priorityLow,    icon: '' };
    }
}

function getStatusStyle(status) {
    switch (status) {
        case 'In Progress': return styles.statusInProgress;
        case 'Pending':     return styles.statusPending;
        case 'Resolved':    return styles.statusResolved;
        default:            return {};
    }
}

function isDueOverdue(due) {
    return due.toLowerCase().includes('mar');
}

export default function TiketProduksi() {
    return (
        <div style={styles.dashboardLayout}>
            <Sidebar />
            <div style={styles.main}>

                {/* ── Header ── */}
                <header style={styles.header}>
                    <div style={styles.titleGroup}>
                        <h1 style={styles.title}>Tiket Produksi</h1>
                        <div style={styles.breadcrumb}>
                            <span>Portal Studio</span>
                            <span style={styles.breadcrumbSeparator}>›</span>
                            <span style={styles.breadcrumbActive}>Tiket</span>
                        </div>
                    </div>

                    <div style={styles.headerRight}>
                        {/* Notification Bell */}
                        <div style={styles.bellWrapper}>
                            <span style={{ fontSize: '17px' }}>🔔</span>
                            <span style={styles.bellDot} />
                        </div>

                        {/* User Card */}
                        <div style={styles.userCard}>
                            <div style={styles.userAvatar}>RF</div>
                            <div style={styles.userInfo}>
                                <span style={styles.userName}>Rohman</span>
                                <span style={styles.userRole}>Lead Animator</span>
                            </div>
                            <span style={styles.chevron}>▾</span>
                        </div>
                    </div>
                </header>

                {/* ── Main Panel ── */}
                <section style={styles.panel}>

                    {/* Toolbar: filter pills + search + new ticket */}
                    <div style={styles.toolbar}>
                        <div style={styles.filterPillGroup}>
                            {statuses.map((status) => (
                                <button
                                    key={status}
                                    style={status === 'Semua' ? styles.filterPillActive : styles.filterPill}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>

                        <div style={styles.toolbarRight}>
                            <div style={styles.searchWrapper}>
                                <span style={styles.searchIcon}>🔍</span>
                                <input
                                    style={styles.searchInput}
                                    type="text"
                                    placeholder="Cari Tiket....."
                                />
                            </div>
                            <button style={styles.newTicketBtn}>+ Tiket Baru</button>
                        </div>
                    </div>

                    {/* Table Card */}
                    <div style={styles.tableCard}>
                        <div style={styles.tableWrapper}>
                            <table style={styles.table}>
                                <thead>
                                    <tr>
                                        <th style={styles.th}>TIKET</th>
                                        <th style={styles.th}>KATEGORI</th>
                                        <th style={styles.th}>PRIORITAS</th>
                                        <th style={styles.th}>STATUS</th>
                                        <th style={styles.th}>DUE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.map((ticket) => {
                                        const { style: pStyle, icon: pIcon } = getPriorityStyle(ticket.priority);
                                        return (
                                            <tr key={ticket.id}>
                                                <td style={styles.td}>
                                                    <div style={styles.ticketCellTitle}>{ticket.title}</div>
                                                    <div style={styles.ticketCellMeta}>
                                                        {ticket.id} • {ticket.meta.split(' • ')[0]} • {ticket.meta.split(' • ')[1]}
                                                    </div>
                                                </td>
                                                <td style={styles.td}>
                                                    <span style={styles.categoryChip}>{ticket.category}</span>
                                                </td>
                                                <td style={styles.td}>
                                                    <span style={pStyle}>
                                                        <span>{pIcon}</span>
                                                        {ticket.priority}
                                                    </span>
                                                </td>
                                                <td style={styles.td}>
                                                    <span style={getStatusStyle(ticket.status)}>
                                                        {ticket.status}
                                                    </span>
                                                </td>
                                                <td style={styles.td}>
                                                    <span style={isDueOverdue(ticket.due) ? styles.dueOverdue : styles.dueNormal}>
                                                        {ticket.due}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}