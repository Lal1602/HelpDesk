import '../styles/NotificationDropdown.css';

const notifications = [
    {
        id: 1,
        icon: 'alert',
        title: 'TK-107: NAS Storage Pool B kritis (92%)',
        time: '10 menit lalu',
        unread: true,
    },
    {
        id: 2,
        icon: 'info',
        title: 'TK-101: Budi memulai perbaikan render farm',
        time: '1 jam lalu',
        unread: true,
    },
    {
        id: 3,
        icon: 'info',
        title: 'TK-103: Monitor Cintiq berhasil dikalibrasi',
        time: '2 jam lalu',
        unread: false,
    },
    {
        id: 4,
        icon: 'warning',
        title: 'License Arnold akan kadaluarsa dalam 2 hari',
        time: '3 jam lalu',
        unread: false,
    },
    {
        id: 5,
        icon: 'info',
        title: 'Jadwal maintenance render farm besok pu...',
        time: '5 jam lalu',
        unread: false,
    },
];

function NotifIcon({ type }) {
    if (type === 'alert') {
        return (
            <div className="notif-icon notif-icon-alert">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
            </div>
        );
    }
    if (type === 'warning') {
        return (
            <div className="notif-icon notif-icon-warning">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
            </div>
        );
    }
    return (
        <div className="notif-icon notif-icon-info">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 16 12 12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
        </div>
    );
}

export default function NotificationDropdown({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <>
            <div className="dropdown-backdrop" onClick={onClose} />
            <div className="notification-dropdown">
                <div className="notification-header">
                    <h3>Notifikasi</h3>
                </div>
                <div className="notification-list">
                    {notifications.map((notif) => (
                        <div key={notif.id} className={`notification-item ${notif.unread ? 'unread' : ''}`}>
                            <NotifIcon type={notif.icon} />
                            <div className="notification-content">
                                <p className="notification-title">{notif.title}</p>
                                <span className="notification-time">{notif.time}</span>
                            </div>
                            {notif.unread && <span className="notification-dot" />}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
