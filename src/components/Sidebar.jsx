import { useLocation, useNavigate } from 'react-router-dom';
import { useSidebar } from '../contexts/SidebarContext';
import '../styles/Sidebar.css';

const menuItems = [
    {
        label: 'Dasbor',
        path: '/dashboard',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
        ),
    },
    {
        label: 'Tiket Produksi',
        path: '/tiket-produksi',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 5v2" /><path d="M15 11v2" /><path d="M15 17v2" />
                <path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V7a2 2 0 0 1 2-2z" />
            </svg>
        ),
    },
    {
        label: 'Proyek',
        path: '/proyek',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l-8 4.5v9l8 4.5 8-4.5v-9L12 3z" />
                <path d="M12 12l8-4.5" /><path d="M12 12v9" /><path d="M12 12L4 7.5" />
            </svg>
        ),
    },
    {
        label: 'Jadwal SLA',
        path: '/jadwal-sla',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
        ),
    },
    {
        label: 'Render Farm',
        path: '/render-farm',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                <line x1="6" y1="6" x2="6.01" y2="6" />
                <line x1="6" y1="18" x2="6.01" y2="18" />
            </svg>
        ),
    },
    {
        label: 'Pusat Panduan',
        path: '/pusat-panduan',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
        ),
    },
];

export default function Sidebar() {
    const location   = useLocation();
    const navigate   = useNavigate();
    const { collapsed, toggle } = useSidebar();

    return (
        <aside className={`sidebar${collapsed ? ' sidebar--collapsed' : ''}`}>
            <div className="sidebar-top">
                {/* Brand Logo */}
                <div className="sidebar-brand">
                    <span className="brand-title">Motion Studio</span>
                    <span className="brand-accent">Helpdesk+</span>
                </div>

                {/* Navigation Menu */}
                <nav className="sidebar-nav">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={item.path}
                                className={`nav-item ${isActive ? 'active' : ''}`}
                                onClick={() => navigate(item.path)}
                                title={collapsed ? item.label : undefined}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                <span className="nav-label">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom Section */}
            <div className="sidebar-bottom">
                <button className="nav-item reduce-btn" onClick={toggle} title={collapsed ? 'Expand sidebar' : 'Reduce sidebar'}>
                    <span className="nav-icon">
                        {collapsed ? (
                            /* Expand icon — chevron kanan */
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                <path d="M15 3v18" />
                            </svg>
                        ) : (
                            /* Collapse icon — panel kiri */
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                <path d="M9 3v18" />
                            </svg>
                        )}
                    </span>
                    <span className="nav-label">{collapsed ? 'Expand' : 'Reduce'}</span>
                </button>
            </div>
        </aside>
    );
}
