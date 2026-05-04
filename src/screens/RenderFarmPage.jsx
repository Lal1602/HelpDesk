import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import PageHeader from '../components/PageHeader';
import '../styles/RenderFarmPage.css';

/* ── Node data ───────────────────────────────────────────────── */
const INITIAL_NODES = [
    { id: '01', name: 'Node Farm 01', status: 'Rendering',   job: 'Ocean Blue – Scene 47',   gpuLoad: 92, temp: '74°C', gpu: 'RTX 4090 x4' },
    { id: '02', name: 'Node Farm 02', status: 'Rendering',   job: 'Brand X – Shot 12',        gpuLoad: 87, temp: '71°C', gpu: 'RTX 4090 x4' },
    { id: '03', name: 'Node Farm 03', status: 'Idle',        job: '—',                        gpuLoad: 0,  temp: '45°C', gpu: 'RTX 4090 x4' },
    { id: '04', name: 'Node Farm 04', status: 'Offline',     job: 'OFFLINE (TK-101)',         gpuLoad: 0,  temp: '—',    gpu: 'RTX 4090 x4' },
    { id: '05', name: 'Node Farm 05', status: 'Rendering',   job: 'Ocean Blue – Scene 52',   gpuLoad: 95, temp: '79°C', gpu: 'RTX 4090 x4' },
    { id: '06', name: 'Node Farm 06', status: 'Maintenance', job: 'Scheduled maintenance',    gpuLoad: 0,  temp: '38°C', gpu: 'RTX 4090 x4' },
    { id: '07', name: 'Node Farm 07', status: 'Offline',     job: 'OFFLINE (TK-101)',         gpuLoad: 0,  temp: '—',    gpu: 'RTX 4090 x4' },
    { id: '08', name: 'Node Farm 08', status: 'Rendering',   job: 'Serial Animasi – Scene 3', gpuLoad: 78, temp: '68°C', gpu: 'RTX 4090 x4' },
];

/* ── Helpers ─────────────────────────────────────────────────── */
function getStatusCls(status) {
    switch (status) {
        case 'Rendering':   return 'rf-badge rf-badge--rendering';
        case 'Idle':        return 'rf-badge rf-badge--idle';
        case 'Offline':     return 'rf-badge rf-badge--offline';
        case 'Maintenance': return 'rf-badge rf-badge--maintenance';
        default:            return 'rf-badge';
    }
}

function getBarColor(load, status) {
    if (status === 'Offline' || status === 'Maintenance' || status === 'Idle') return '#e5e7eb';
    if (load >= 80) return '#22c55e';
    if (load >= 50) return '#f59e0b';
    return '#ef4444';
}

/* ── Refresh Icon ────────────────────────────────────────────── */
function IconRefresh({ spinning }) {
    return (
        <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.2"
            strokeLinecap="round" strokeLinejoin="round"
            className={spinning ? 'rf-spin' : ''}
        >
            <polyline points="23 4 23 10 17 10" />
            <polyline points="1 20 1 14 7 14" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
        </svg>
    );
}

/* ── GPU Load Bar ────────────────────────────────────────────── */
function GpuBar({ load, status }) {
    const barColor = getBarColor(load, status);
    const active   = status === 'Rendering';
    return (
        <div className="rf-gpu-bar-wrap">
            <div className="rf-gpu-track">
                <div
                    className="rf-gpu-fill"
                    style={{
                        width: `${load}%`,
                        background: active ? barColor : '#e5e7eb',
                        transition: 'width 0.6s ease',
                    }}
                />
            </div>
            <span className="rf-gpu-pct">{load}%</span>
        </div>
    );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function RenderFarmPage({ user, onLogout }) {
    const [nodes,   setNodes]   = useState(INITIAL_NODES);
    const [spinning, setSpinning] = useState(false);

    /* Simulate refresh */
    const handleRefresh = () => {
        if (spinning) return;
        setSpinning(true);
        setTimeout(() => {
            setNodes(prev => prev.map(n => {
                if (n.status !== 'Rendering') return n;
                const delta = Math.floor(Math.random() * 7) - 3;
                return { ...n, gpuLoad: Math.max(60, Math.min(99, n.gpuLoad + delta)) };
            }));
            setSpinning(false);
        }, 900);
    };

    return (
        <div className="rf-layout">
            <Sidebar />

            <div className="rf-main">
                <PageHeader
                    title="Render Farm Monitor"
                    breadcrumb="Render Farm"
                    user={user}
                    onLogout={onLogout}
                />

                <section className="rf-panel">
                    <div className="rf-card">

                        {/* ── Card Header ── */}
                        <div className="rf-card-header">
                            <h2 className="rf-card-title">Status Node Render Farm</h2>
                            <button
                                className="rf-refresh-btn"
                                onClick={handleRefresh}
                                title="Refresh data"
                            >
                                <IconRefresh spinning={spinning} />
                            </button>
                        </div>

                        {/* ── Table ── */}
                        <div className="rf-table-wrapper">
                            <table className="rf-table">
                                <thead>
                                    <tr>
                                        <th>NODE</th>
                                        <th>STATUS</th>
                                        <th>JOB AKTIF</th>
                                        <th>GPU LOAD</th>
                                        <th>SUHU</th>
                                        <th>GPU</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {nodes.map(node => (
                                        <tr key={node.id}>
                                            <td>
                                                <span className="rf-node-name">{node.name}</span>
                                            </td>
                                            <td>
                                                <span className={getStatusCls(node.status)}>
                                                    {node.status}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`rf-job${node.status === 'Offline' ? ' rf-job--offline' : ''}`}>
                                                    {node.job}
                                                </span>
                                            </td>
                                            <td>
                                                <GpuBar load={node.gpuLoad} status={node.status} />
                                            </td>
                                            <td>
                                                <span className={`rf-temp${node.temp === '—' ? ' rf-temp--na' : ''}`}>
                                                    {node.temp}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="rf-gpu-label">{node.gpu}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </section>
            </div>
        </div>
    );
}
