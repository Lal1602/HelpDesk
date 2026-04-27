import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import PageHeader from '../components/PageHeader';
import { projects } from '../data/projects';
import '../styles/ProjectPage.css';

/* ── SVG Icons ───────────────────────────────────────────────── */
function IconPersonnel() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );
}

function IconStorage() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        </svg>
    );
}

/* ── Component ───────────────────────────────────────────────── */
export default function ProjectPage({ user, onLogout }) {
    const navigate = useNavigate();

    return (
        <div className="project-layout">
            <Sidebar />

            <div className="project-main">
                {/* ── Reusable Header ── */}
                <PageHeader
                    title="Proyek & Pipeline"
                    breadcrumb="Proyek"
                    user={user}
                    onLogout={onLogout}
                />

                {/* ── Main Panel ── */}
                <section className="project-panel">
                    <div className="project-card">
                        {projects.map((proj, idx) => (
                            <div
                                key={proj.id}
                                className="proj-row"
                                style={{ animationDelay: `${idx * 55}ms`, cursor: 'pointer' }}
                                onClick={() => navigate(`/proyek/${proj.id}`)}
                            >
                                {/* Left — info */}
                                <div className="proj-info">
                                    <div className="proj-tags">
                                        {proj.tags.map(tag => (
                                            <span key={tag.label} className={`proj-tag ${tag.cls}`}>
                                                {tag.label}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="proj-title">{proj.title}</h3>
                                    <p className="proj-meta">
                                        {proj.manager}
                                        <span className="proj-dot">&nbsp;•&nbsp;</span>
                                        Deadline: {proj.deadline}
                                    </p>
                                </div>

                                {/* Right — stats */}
                                <div className="proj-stats">
                                    <div className="proj-stat">
                                        <span className="proj-stat-icon"><IconPersonnel /></span>
                                        <span className="proj-stat-label">{proj.personnel} Personnel</span>
                                    </div>
                                    <div className="proj-stat">
                                        <span className="proj-stat-icon"><IconStorage /></span>
                                        <span className="proj-stat-label">{proj.storage} has been use</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
