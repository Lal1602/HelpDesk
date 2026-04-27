import { useState, useRef, useCallback, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import PageHeader from '../components/PageHeader';
import { isHoliday, getHolidayName } from '../data/holidays';
import '../styles/JadwalSLAPage.css';

/* ── Constants ───────────────────────────────────────────────── */
const MONTHS_ID = [
    'Januari','Februari','Maret','April','Mei','Juni',
    'Juli','Agustus','September','Oktober','November','Desember',
];
const DAYS_ID = ['MINGGU','SENIN','SELASA','RABU','KAMIS','JUMAT','SABTU'];

const REMINDER_COLORS = [
    { id: 'blue',   bg: '#dbeafe', text: '#1d4ed8' },
    { id: 'yellow', bg: '#fef9c3', text: '#854d0e' },
    { id: 'green',  bg: '#d1fae5', text: '#065f46' },
    { id: 'teal',   bg: '#ccfbf1', text: '#0f766e' },
    { id: 'purple', bg: '#ede9fe', text: '#5b21b6' },
];

const INITIAL_REMINDERS = {
    '2026-03-14': [{ id: 1, text: 'SLA: License Server',        color: 'blue'   }],
    '2026-03-15': [{ id: 2, text: 'Update Plugin Redshift',      color: 'yellow' }],
    '2026-03-20': [{ id: 3, text: 'Review Proyek Ocean Blue',    color: 'green'  }],
    '2026-03-26': [{ id: 4, text: 'Maintenance Rutin Server',    color: 'blue'   }],
};

/* ── Helpers ─────────────────────────────────────────────────── */
const fmtKey = (y, m, d) =>
    `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

function getCalendarCells(year, month) {
    const firstDay     = new Date(year, month, 1).getDay();
    const daysInMonth  = new Date(year, month + 1, 0).getDate();
    const prevTotal    = new Date(year, month, 0).getDate();

    const cells = [];

    // prev-month overflow
    for (let i = firstDay - 1; i >= 0; i--) {
        const d = prevTotal - i;
        const m = month === 0 ? 11 : month - 1;
        const y = month === 0 ? year - 1 : year;
        cells.push({ day: d, month: m, year: y, isCurrentMonth: false });
    }

    // current month
    for (let d = 1; d <= daysInMonth; d++) {
        cells.push({ day: d, month, year, isCurrentMonth: true });
    }

    // next-month fill to complete rows
    const rows  = Math.ceil(cells.length / 7);
    const total = rows * 7;
    let nd = 1;
    const nm = month === 11 ? 0 : month + 1;
    const ny = month === 11 ? year + 1 : year;
    while (cells.length < total) cells.push({ day: nd++, month: nm, year: ny, isCurrentMonth: false });

    return cells;
}

const today = new Date();

/* ── Reminder Popover ────────────────────────────────────────── */
function ReminderPopover({ anchor, dateKey, reminder, onSave, onDelete, onClose }) {
    const [text,  setText]  = useState(reminder?.text  ?? '');
    const [color, setColor] = useState(reminder?.color ?? 'blue');
    const ref = useRef(null);

    // Position the popover next to the cell, clamped within viewport
    const style = (() => {
        if (!anchor) return {};
        const popW   = 240;
        const popH   = 220; // estimasi tinggi popover
        const vw     = window.innerWidth;
        const vh     = window.innerHeight;
        const margin = 8;

        // Horizontal: prefer kanan cell, fallback ke kiri
        let left;
        if (anchor.right + margin + popW <= vw) {
            left = anchor.right + margin;
        } else {
            left = Math.max(margin, anchor.left - popW - margin);
        }

        // Vertical: mulai dari atas cell, clamp agar tidak keluar bawah layar
        let top = anchor.top;
        if (top + popH > vh - margin) {
            top = Math.max(margin, vh - popH - margin);
        }

        return { position: 'fixed', left, top };
    })();

    // Close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) onClose();
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [onClose]);

    const handleSave = () => {
        if (!text.trim()) return;
        onSave({ text: text.trim(), color });
    };

    return (
        <div className="sla-popover" style={style} ref={ref} onMouseDown={e => e.stopPropagation()}>
            <p className="sla-pop-title">
                {reminder ? 'Edit Catatan' : 'Tambah Reminder'}
            </p>
            <textarea
                className="sla-pop-input"
                placeholder="Tulis catatan / reminder…"
                value={text}
                onChange={e => setText(e.target.value)}
                rows={3}
                autoFocus
            />
            <div className="sla-pop-colors">
                {REMINDER_COLORS.map(c => (
                    <button
                        key={c.id}
                        className={`sla-color-dot${color === c.id ? ' selected' : ''}`}
                        style={{ background: c.bg, border: `2px solid ${c.text}` }}
                        onClick={() => setColor(c.id)}
                        title={c.id}
                    />
                ))}
            </div>
            <div className="sla-pop-actions">
                {reminder && (
                    <button className="sla-pop-delete" onClick={() => onDelete()}>Hapus</button>
                )}
                <button className="sla-pop-cancel" onClick={onClose}>Batal</button>
                <button className="sla-pop-save"   onClick={handleSave}>Simpan</button>
            </div>
        </div>
    );
}

/* ── Calendar Cell ───────────────────────────────────────────── */
function CalendarCell({ cell, reminders, onOpenAdd, onOpenEdit }) {
    const [hovered, setHovered] = useState(false);
    const cellRef = useRef(null);

    const key       = fmtKey(cell.year, cell.month, cell.day);
    const holiday   = isHoliday(key);
    const holName   = getHolidayName(key);
    const isToday   = cell.isCurrentMonth &&
                      cell.day   === today.getDate() &&
                      cell.month === today.getMonth() &&
                      cell.year  === today.getFullYear();

    const cellCls = [
        'sla-cell',
        !cell.isCurrentMonth ? 'sla-cell--overflow' : '',
        holiday              ? 'sla-cell--holiday'  : '',
        isToday              ? 'sla-cell--today'    : '',
    ].filter(Boolean).join(' ');

    const handleAddClick = (e) => {
        e.stopPropagation();
        const rect = cellRef.current.getBoundingClientRect();
        onOpenAdd(key, rect);
    };

    return (
        <div
            ref={cellRef}
            className={cellCls}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Day number */}
            <div className="sla-day-num">
                {cell.day}
                {holiday && (
                    <span className="sla-holiday-badge" title={holName}>●</span>
                )}
            </div>

            {/* Holiday name */}
            {holiday && cell.isCurrentMonth && (
                <p className="sla-holiday-name">{holName}</p>
            )}

            {/* Reminder pills */}
            {(reminders ?? []).map(rem => {
                const col = REMINDER_COLORS.find(c => c.id === rem.color) ?? REMINDER_COLORS[0];
                return (
                    <div
                        key={rem.id}
                        className="sla-reminder-pill"
                        style={{ background: col.bg, color: col.text }}
                        onClick={e => {
                            e.stopPropagation();
                            const rect = cellRef.current.getBoundingClientRect();
                            onOpenEdit(key, rem, rect);
                        }}
                    >
                        <span className="sla-rem-text">{rem.text}</span>
                    </div>
                );
            })}

            {/* Add button (on hover) */}
            {hovered && (
                <button
                    className="sla-add-btn"
                    onClick={handleAddClick}
                    title="Tambah reminder"
                >
                    +
                </button>
            )}
        </div>
    );
}

/* ── Main Page ───────────────────────────────────────────────── */
export default function JadwalSLAPage({ user, onLogout }) {
    const now = new Date();
    const [curYear,  setCurYear]  = useState(now.getFullYear());
    const [curMonth, setCurMonth] = useState(now.getMonth());

    // Load reminders from localStorage, fallback to initial
    const [reminders, setReminders] = useState(() => {
        try {
            const saved = localStorage.getItem('sla_reminders');
            return saved ? JSON.parse(saved) : INITIAL_REMINDERS;
        } catch {
            return INITIAL_REMINDERS;
        }
    });

    // Persist on change
    useEffect(() => {
        localStorage.setItem('sla_reminders', JSON.stringify(reminders));
    }, [reminders]);

    // Popover state
    const [popover, setPopover] = useState(null);
    // { dateKey, reminder: null|{id,text,color}, anchor: DOMRect }

    const cells = getCalendarCells(curYear, curMonth);

    /* ── Navigation ── */
    const prevMonth = () => {
        if (curMonth === 0) { setCurMonth(11); setCurYear(y => y - 1); }
        else setCurMonth(m => m - 1);
    };
    const nextMonth = () => {
        if (curMonth === 11) { setCurMonth(0); setCurYear(y => y + 1); }
        else setCurMonth(m => m + 1);
    };

    /* ── Popover handlers ── */
    const openAdd = useCallback((dateKey, rect) => {
        setPopover({ dateKey, reminder: null, anchor: rect });
    }, []);

    const openEdit = useCallback((dateKey, rem, rect) => {
        setPopover({ dateKey, reminder: rem, anchor: rect });
    }, []);

    const closePopover = useCallback(() => setPopover(null), []);

    const handleSave = useCallback(({ text, color }) => {
        const { dateKey, reminder } = popover;
        setReminders(prev => {
            const list = prev[dateKey] ? [...prev[dateKey]] : [];
            if (reminder) {
                // edit
                return { ...prev, [dateKey]: list.map(r => r.id === reminder.id ? { ...r, text, color } : r) };
            } else {
                // add
                const newId = Date.now();
                return { ...prev, [dateKey]: [...list, { id: newId, text, color }] };
            }
        });
        setPopover(null);
    }, [popover]);

    const handleDelete = useCallback(() => {
        const { dateKey, reminder } = popover;
        setReminders(prev => {
            const list = (prev[dateKey] ?? []).filter(r => r.id !== reminder.id);
            const next = { ...prev };
            if (list.length === 0) delete next[dateKey];
            else next[dateKey] = list;
            return next;
        });
        setPopover(null);
    }, [popover]);

    return (
        <div className="sla-layout">
            <Sidebar />

            <div className="sla-main">
                <PageHeader
                    title="Jadwal SLA & Deadline"
                    breadcrumb="Kalender"
                    user={user}
                    onLogout={onLogout}
                />

                <section className="sla-panel">
                    {/* ── Calendar Header ── */}
                    <div className="sla-cal-header">
                        <h2 className="sla-month-label">
                            {MONTHS_ID[curMonth]} {curYear}
                        </h2>
                        <div className="sla-nav-btns">
                            <button className="sla-nav-btn" onClick={prevMonth} aria-label="Bulan sebelumnya">‹</button>
                            <button className="sla-nav-btn" onClick={nextMonth} aria-label="Bulan berikutnya">›</button>
                        </div>
                    </div>

                    {/* ── Calendar Grid ── */}
                    <div className="sla-calendar">
                        {/* Day headers */}
                        {DAYS_ID.map(d => (
                            <div key={d} className={`sla-day-header${d === 'MINGGU' || d === 'SABTU' ? ' sla-weekend' : ''}`}>
                                {d}
                            </div>
                        ))}

                        {/* Day cells */}
                        {cells.map((cell, i) => {
                            const key = fmtKey(cell.year, cell.month, cell.day);
                            return (
                                <CalendarCell
                                    key={i}
                                    cell={cell}
                                    reminders={reminders[key] ?? []}
                                    onOpenAdd={openAdd}
                                    onOpenEdit={openEdit}
                                />
                            );
                        })}
                    </div>
                </section>
            </div>

            {/* ── Popover ── */}
            {popover && (
                <ReminderPopover
                    anchor={popover.anchor}
                    dateKey={popover.dateKey}
                    reminder={popover.reminder}
                    onSave={handleSave}
                    onDelete={handleDelete}
                    onClose={closePopover}
                />
            )}
        </div>
    );
}
