/* ── Shared project data ─────────────────────────────────────────
   Digunakan oleh ProjectPage (list) dan ProjectDetailPage (detail)
──────────────────────────────────────────────────────────────── */

export const projects = [
    {
        id: 1,
        tags: [
            { label: 'Feature Film', cls: 'tag-film' },
            { label: 'Active',       cls: 'tag-active' },
        ],
        title: 'Film Animasi "Ocean Blue"',
        manager: 'Doni H.',
        deadline: '30 Apr',
        deadlineFull: '30 Apr 2026',
        personnel: 24,
        storage: '8.2 TB',
        tasks: [
            { id: 1, title: 'Animatic & Storyboard Review',   status: 'Resolved',    statusCls: 'ts-resolved' },
            { id: 2, title: 'Character Rigging – Ocean',      status: 'In Progress', statusCls: 'ts-progress' },
            { id: 3, title: 'VFX Water Simulation',           status: 'In Progress', statusCls: 'ts-progress' },
            { id: 4, title: 'Final Color Grading',            status: 'Pending',     statusCls: 'ts-pending'  },
        ],
        team: [
            { id: 1, initials: 'DH', name: 'Doni H.',   role: 'Lead Director',  color: '#e67e22' },
            { id: 2, initials: 'A',  name: 'Member',    role: 'Role',           color: '#0d9e8a' },
            { id: 3, initials: 'B',  name: 'Member',    role: 'Role',           color: '#0d9e8a' },
            { id: 4, initials: 'C',  name: 'Member',    role: 'Role',           color: '#0d9e8a' },
            { id: 5, initials: 'D',  name: 'Member',    role: 'Role',           color: '#0d9e8a' },
        ],
    },
    {
        id: 2,
        tags: [
            { label: 'Commercial', cls: 'tag-commercial' },
            { label: 'Active',     cls: 'tag-active' },
        ],
        title: 'Iklan Commercial – Brand X',
        manager: 'Maya S.',
        deadline: '20 Mar',
        deadlineFull: '20 Mar 2026',
        personnel: 8,
        storage: '1.1 TB',
        tasks: [
            { id: 1, title: 'Modeling Karakter – High Poly',  status: 'In Progress', statusCls: 'ts-progress' },
            { id: 2, title: 'Rigging Environment',            status: 'In Progress', statusCls: 'ts-progress' },
            { id: 3, title: 'Lighting & Lookdev – Scene 04',  status: 'In Progress', statusCls: 'ts-progress' },
            { id: 4, title: 'Final Rendering',                status: 'Pending',     statusCls: 'ts-pending'  },
        ],
        team: [
            { id: 1, initials: 'MS', name: 'Maya S.',  role: 'Lead Artist', color: '#d4a017' },
            { id: 2, initials: 'M',  name: 'Member',   role: 'Role',        color: '#0d9e8a' },
            { id: 3, initials: 'M',  name: 'Member',   role: 'Role',        color: '#0d9e8a' },
            { id: 4, initials: 'M',  name: 'Member',   role: 'Role',        color: '#0d9e8a' },
            { id: 5, initials: 'M',  name: 'Member',   role: 'Role',        color: '#0d9e8a' },
        ],
    },
    {
        id: 3,
        tags: [
            { label: 'Infrastructure', cls: 'tag-infra' },
            { label: 'On Hold',        cls: 'tag-hold' },
        ],
        title: 'Upgrade Server Storage (1PB)',
        manager: 'Rian (IT)',
        deadline: '05 Apr',
        deadlineFull: '05 Apr 2026',
        personnel: 3,
        storage: 'N/A TB',
        tasks: [
            { id: 1, title: 'Pengadaan Hardware Storage',     status: 'Pending',     statusCls: 'ts-pending'  },
            { id: 2, title: 'Instalasi Rack Server',          status: 'Pending',     statusCls: 'ts-pending'  },
            { id: 3, title: 'Konfigurasi RAID & Network',     status: 'Pending',     statusCls: 'ts-pending'  },
        ],
        team: [
            { id: 1, initials: 'RI', name: 'Rian (IT)', role: 'IT Lead',     color: '#2563eb' },
            { id: 2, initials: 'M',  name: 'Member',    role: 'Role',        color: '#0d9e8a' },
            { id: 3, initials: 'M',  name: 'Member',    role: 'Role',        color: '#0d9e8a' },
        ],
    },
    {
        id: 4,
        tags: [
            { label: 'Series',   cls: 'tag-series' },
            { label: 'Planning', cls: 'tag-planning' },
        ],
        title: 'Serial Animasi',
        manager: 'Ahmad B.',
        deadline: '01 Jun',
        deadlineFull: '01 Jun 2026',
        personnel: 6,
        storage: '0.3 TB',
        tasks: [
            { id: 1, title: 'Concept Art & Pitching',         status: 'In Progress', statusCls: 'ts-progress' },
            { id: 2, title: 'Script Episode 1–3',             status: 'Pending',     statusCls: 'ts-pending'  },
            { id: 3, title: 'Character Design',               status: 'Pending',     statusCls: 'ts-pending'  },
        ],
        team: [
            { id: 1, initials: 'AB', name: 'Ahmad B.', role: 'Series Director', color: '#ea580c' },
            { id: 2, initials: 'M',  name: 'Member',   role: 'Role',            color: '#0d9e8a' },
            { id: 3, initials: 'M',  name: 'Member',   role: 'Role',            color: '#0d9e8a' },
            { id: 4, initials: 'M',  name: 'Member',   role: 'Role',            color: '#0d9e8a' },
        ],
    },
];
