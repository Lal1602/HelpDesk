import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import PageHeader from '../components/PageHeader';
import { projects } from '../data/projects';
import '../styles/ProjectDetailPage.css';

/* ── Icons ───────────────────────────────────────────────────── */
function IconBack() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
        </svg>
    );
}

function IconProjectLogo() {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l-8 4.5v9l8 4.5 8-4.5v-9L12 3z" />
            <path d="M12 12l8-4.5" />
            <path d="M12 12v9" />
            <path d="M12 12L4 7.5" />
        </svg>
    );
}

function IconClock() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    );
}

function IconTaskDoc() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="#0d9e8a" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="9" y1="13" x2="15" y2="13" />
            <line x1="9" y1="17" x2="13" y2="17" />
        </svg>
    );
}

function IconStorageLarge() {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
            stroke="#0d9e8a" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
    );
}

/* ── Component ───────────────────────────────────────────────── */
export default function ProjectDetailPage({ user, onLogout }) {
    const { id }   = useParams();
    const navigate = useNavigate();

    const project  = projects.find(p => p.id === Number(id)) ?? projects[1];

    return (
        <div className="pd-layout">
            <Sidebar />

            <div className="pd-main">
                {/* ── Header — 3-level breadcrumb ── */}
                <PageHeader
                    title="Proyek & Pipeline"
                    breadcrumb="Proyek"
                    breadcrumbSub={project.title}
                    onBreadcrumbClick={() => navigate('/proyek')}
                    user={user}
                    onLogout={onLogout}
                />

                {/* ── Content ── */}
                <div className="pd-content">
                    <div className="pd-card">

                        {/* ── Back button ── */}
                        <div className="pd-back-row">
                            <button
                                className="pd-back-btn"
                                onClick={() => navigate('/proyek')}
                                aria-label="Kembali ke daftar proyek"
                            >
                                <IconBack />
                            </button>
                        </div>

                        {/*
                         * ── Grid 2 kolom (kiri: main content | kanan: sidebar) ──
                         *
                         * Baris 1: [Project Identity]  | [Alokasi Storage]
                         * Baris 2: [Tugas Produksi]    | [Tim Proyek]
                         *
                         * Ini memastikan alignment HORIZONTAL yang presisi:
                         *  • Judul proyek  ↔  ALOKASI STORAGE (baris 1)
                         *  • Tugas Produksi Aktif  ↔  TIM PROYEK (baris 2)
                         */}
                        <div className="pd-grid">

                            {/* ── Kolom Kiri — Row 1: Project Identity ── */}
                            <div className="pd-cell pd-cell--identity">
                                <div className="pd-hero-body">
                                    <div className="pd-proj-icon">
                                        <IconProjectLogo />
                                    </div>

                                    <div className="pd-proj-info">
                                        <div className="pd-tags">
                                            {project.tags.map(tag => (
                                                <span key={tag.label} className={`pd-tag ${tag.cls}`}>
                                                    {tag.label}
                                                </span>
                                            ))}
                                        </div>
                                        <h1 className="pd-title">{project.title}</h1>
                                        <div className="pd-meta">
                                            <span className="pd-meta-supervisor">
                                                Lead Supervisor: {project.manager}
                                            </span>
                                            <span className="pd-meta-deadline">
                                                <IconClock />
                                                Deadline: {project.deadlineFull}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ── Kolom Kanan — Row 1: Alokasi Storage ── */}
                            <div className="pd-cell pd-cell--storage">
                                <p className="pd-section-label">ALOKASI STORAGE</p>
                                <div className="pd-storage-val">
                                    <IconStorageLarge />
                                    <span className="pd-storage-num">{project.storage}</span>
                                </div>
                            </div>

                            {/* ── Kolom Kiri — Row 2: Tugas Produksi ── */}
                            <div className="pd-cell pd-cell--tasks">
                                <div className="pd-tasks-header">
                                    <h3 className="pd-tasks-title">Tugas Produksi Aktif</h3>
                                    <p className="pd-tasks-sub">Daftar pengerjaan shot dan aset terkini</p>
                                </div>

                                <div className="pd-task-list">
                                    {project.tasks.map(task => (
                                        <div key={task.id} className="pd-task-row">
                                            <span className="pd-task-icon"><IconTaskDoc /></span>
                                            <span className="pd-task-name">{task.title}</span>
                                            <span className={`pd-task-badge ${task.statusCls}`}>
                                                {task.status.toUpperCase()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ── Kolom Kanan — Row 2: Tim Proyek ── */}
                            <div className="pd-cell pd-cell--team">
                                <div className="pd-team-header">
                                    <p className="pd-section-label">TIM PROYEK</p>
                                    <span className="pd-team-count">{project.personnel} Personnel</span>
                                </div>

                                <div className="pd-member-list">
                                    {project.team.map(member => (
                                        <div key={member.id} className="pd-member-row">
                                            <div
                                                className="pd-member-avatar"
                                                style={{ background: member.color }}
                                            >
                                                {member.initials}
                                            </div>
                                            <div className="pd-member-info">
                                                <span className="pd-member-name">{member.name}</span>
                                                <span className="pd-member-role">{member.role}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>{/* /pd-grid */}
                    </div>{/* /pd-card */}
                </div>
            </div>
        </div>
    );
}
