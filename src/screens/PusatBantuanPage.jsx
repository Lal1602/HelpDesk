import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import PageHeader from '../components/PageHeader';
import '../styles/PusatBantuanPage.css';

/* ── Data ────────────────────────────────────────────────────── */
const CATEGORIES = [
    {
        id: 'pipeline', label: 'Pipeline & 3D Software', bg: '#4f46e5',
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l-8 4.5v9l8 4.5 8-4.5v-9L12 3z" />
                <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
            </svg>
        ),
    },
    {
        id: 'render', label: 'Render & Compositing', bg: '#0d9e8a',
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
                <circle cx="12" cy="10" r="3" />
                <polyline points="10 10 12 7 14 10" />
            </svg>
        ),
    },
    {
        id: 'tablet', label: 'Pen Tablet & Periferal', bg: '#7c3aed',
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="13.5" cy="6.5" r=".5" fill="#fff" />
                <circle cx="17.5" cy="10.5" r=".5" fill="#fff" />
                <circle cx="8.5" cy="7.5" r=".5" fill="#fff" />
                <circle cx="6.5" cy="12.5" r=".5" fill="#fff" />
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
            </svg>
        ),
    },
    {
        id: 'storage', label: 'Storage & Asset Sync', bg: '#1f2937',
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
        ),
    },
];

const GUIDES = [
    { id: 1, title: 'Cara Setup Multi-GPU Rendering di Redshift',    tag: 'Render',      tagCls: 'tag-render'      },
    { id: 2, title: 'Mengatasi Lag Wacom Cintiq di Windows 11',       tag: 'Hardware',    tagCls: 'tag-hardware'    },
    { id: 3, title: 'Akses Shotgrid via VPN untuk Remote Artist',     tag: 'Pipeline',    tagCls: 'tag-pipeline'    },
    { id: 4, title: 'Optimasi RAM Maya untuk Adegan Kompleks',        tag: 'Software',    tagCls: 'tag-software'    },
    { id: 5, title: 'Setup Houdini PDG untuk Pipeline Otomatis',      tag: 'Pipeline',    tagCls: 'tag-pipeline'    },
    { id: 6, title: 'Mengatasi Crash DaVinci Resolve saat Render',    tag: 'Compositing', tagCls: 'tag-compositing' },
    { id: 7, title: 'Konfigurasi Deadline Monitor & Render Queue',    tag: 'Render Farm', tagCls: 'tag-renderfarm'  },
    { id: 8, title: 'Troubleshoot Error ShotGrid Asset Sync',         tag: 'Pipeline',    tagCls: 'tag-pipeline'    },
];

const TEAM = [
    { initials: 'BD', name: 'Budi',  role: 'IT Support',     color: '#3b82f6' },
    { initials: 'ST', name: 'Siti',  role: 'Pipeline',       color: '#ef4444' },
    { initials: 'RN', name: 'Rian',  role: 'IT Support',     color: '#1e3a5f' },
    { initials: 'DS', name: 'Desi',  role: 'Infrastructure', color: '#7c3aed' },
];

/* ── Component ───────────────────────────────────────────────── */
export default function PusatBantuanPage({ user, onLogout }) {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState(null);

    const filtered = GUIDES.filter(g => {
        const matchSearch = g.title.toLowerCase().includes(search.toLowerCase());
        const matchCat    = !activeCategory || g.tagCls === `tag-${activeCategory}`;
        return matchSearch && matchCat;
    });

    return (
        <div className="pb-layout">
            <Sidebar />

            <div className="pb-main">
                <PageHeader
                    title="Pusat Bantuan"
                    breadcrumb="Kb"
                    user={user}
                    onLogout={onLogout}
                />

                <div className="pb-content">

                    {/* ── Hero Banner ── */}
                    <div className="pb-hero">
                        <h1 className="pb-hero-title">Pusat Bantuan</h1>
                        <p className="pb-hero-sub">
                            Panduan instalasi plugin, setup monitor, hingga optimasi render farm
                        </p>
                        <div className="pb-search-wrap">
                            <svg className="pb-search-icon" width="16" height="16" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="2.5"
                                strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                className="pb-search-input"
                                type="text"
                                placeholder="Cari: 'Wacom driver', 'Arnold render', 'Shotgrid VPN'..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* ── Category Cards ── */}
                    <div className="pb-categories">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                className={`pb-cat-card${activeCategory === cat.id ? ' active' : ''}`}
                                onClick={() => setActiveCategory(prev => prev === cat.id ? null : cat.id)}
                            >
                                <div className="pb-cat-icon" style={{ background: cat.bg }}>
                                    {cat.icon}
                                </div>
                                <span className="pb-cat-label">{cat.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* ── Body: Guides + Sidebar ── */}
                    <div className="pb-body">

                        {/* Left — Panduan Terpopuler (scrollable) */}
                        <div className="pb-guides-col">
                            <h2 className="pb-guides-title">Panduan Terpopuler</h2>
                            {/* ↓ This wrapper is the scrollable container */}
                            <div className="pb-guides-scroll">
                                {filtered.length === 0 ? (
                                    <p className="pb-guides-empty">Tidak ada panduan yang cocok.</p>
                                ) : (
                                    filtered.map(guide => (
                                        <div key={guide.id} className="pb-guide-row">
                                            <p className="pb-guide-title">{guide.title}</p>
                                            <span className={`pb-guide-tag ${guide.tagCls}`}>
                                                {guide.tag}
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Right — Kontak Tim */}
                        <div className="pb-contact-col">
                            <div className="pb-contact-card">
                                {/* Header */}
                                <div className="pb-contact-header">
                                    <div className="pb-contact-icon">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                                            stroke="#9ca3af" strokeWidth="2"
                                            strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                                            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="pb-contact-title">Tidak menemukan jawaban?</p>
                                        <p className="pb-contact-sub">
                                            Tim IT Pipeline siap membantu Anda secara langsung.
                                        </p>
                                    </div>
                                </div>

                                {/* Team list */}
                                <div className="pb-team-list">
                                    {TEAM.map(member => (
                                        <div key={member.initials} className="pb-team-row">
                                            <div className="pb-team-avatar" style={{ background: member.color }}>
                                                {member.initials}
                                            </div>
                                            <div className="pb-team-info">
                                                <span className="pb-team-name">{member.name}</span>
                                                <span className="pb-team-role">{member.role}</span>
                                            </div>
                                            <button className="pb-chat-btn" title={`Chat ${member.name}`}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2"
                                                    strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
