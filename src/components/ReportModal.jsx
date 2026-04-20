import { useState } from 'react';
import '../styles/ReportModal.css';

export default function ReportModal({ isOpen, onClose }) {
    const [judul, setJudul] = useState('');
    const [kategori, setKategori] = useState('Software');
    const [prioritas, setPrioritas] = useState('Rendah');
    const [proyek, setProyek] = useState('Film Animasi "Ocean Blue"');
    const [deskripsi, setDeskripsi] = useState('');

    if (!isOpen) return null;

    const handleSubmit = () => {
        alert('Tiket berhasil dikirim!');
        setJudul('');
        setDeskripsi('');
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container report-modal" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="modal-header">
                    <div>
                        <h2 className="modal-title">Lapor Kendala Produksi</h2>
                        <p className="modal-subtitle">Isi formulir dengan detail masalah teknis Anda</p>
                    </div>
                    <button className="modal-close" onClick={onClose}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <div className="modal-body">
                    {/* Judul Masalah */}
                    <div className="form-group">
                        <label className="form-label">JUDUL MASALAH</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Contoh: Render Farm Node 04 Tidak Merespon"
                            value={judul}
                            onChange={(e) => setJudul(e.target.value)}
                        />
                    </div>

                    {/* Kategori & Prioritas */}
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">KATEGORI</label>
                            <div className="form-select-wrapper">
                                <select
                                    className="form-select"
                                    value={kategori}
                                    onChange={(e) => setKategori(e.target.value)}
                                >
                                    <option>Software</option>
                                    <option>Hardware</option>
                                    <option>Render Farm</option>
                                    <option>Network</option>
                                    <option>License</option>
                                </select>
                                <svg className="select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">PRIORITAS</label>
                            <div className="form-select-wrapper">
                                <select
                                    className="form-select"
                                    value={prioritas}
                                    onChange={(e) => setPrioritas(e.target.value)}
                                >
                                    <option>Rendah</option>
                                    <option>Sedang</option>
                                    <option>Tinggi</option>
                                    <option>Kritis</option>
                                </select>
                                <svg className="select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Proyek Terdampak */}
                    <div className="form-group">
                        <label className="form-label">PROYEK TERDAMPAK</label>
                        <div className="form-select-wrapper">
                            <select
                                className="form-select"
                                value={proyek}
                                onChange={(e) => setProyek(e.target.value)}
                            >
                                <option>Film Animasi &quot;Ocean Blue&quot;</option>
                                <option>Film Animasi &quot;Sky Runner&quot;</option>
                                <option>Commercial Project A</option>
                                <option>Internal R&amp;D</option>
                            </select>
                            <svg className="select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </div>
                    </div>

                    {/* Deskripsi Detail */}
                    <div className="form-group">
                        <label className="form-label">DESKRIPSI DETAIL</label>
                        <textarea
                            className="form-textarea"
                            placeholder="Jelaskan solusi yang sudah dilakukan, keterangan pesan eror, dll."
                            rows="4"
                            value={deskripsi}
                            onChange={(e) => setDeskripsi(e.target.value)}
                        />
                    </div>

                    {/* File Attachment */}
                    <div className="form-attachment">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                        </svg>
                        <span>Lampirkan screenshot atau file log</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={onClose}>Batal</button>
                    <button className="btn-submit" onClick={handleSubmit}>Kirim Tiket</button>
                </div>
            </div>
        </div>
    );
}
