import { useState } from 'react';
import '../styles/ReportModal.css';

export default function ReportModal({ isOpen, onClose }) {
    // State dideklarasikan di sini
    const [judul, setJudul] = useState('');
    const [kategori, setKategori] = useState('');
    const [prioritas, setPrioritas] = useState('');
    const [proyek, setProyek] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Mulai loading

        // PERBAIKAN 1: Gunakan state yang benar (judul, kategori, dll), BUKAN formData
        const newTicket = {
            user_id: 1,
            title: judul,
            category: kategori,
            priority: prioritas,
            project_affected: proyek,
            description: deskripsi
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/tickets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(newTicket)
            });

            const data = await response.json();

            if (response.ok) {
                alert('Laporan berhasil dikirim!');

                // PERBAIKAN 2: Reset state satu per satu menggunakan fungsi set yang benar
                setJudul('');
                setKategori('');
                setPrioritas('');
                setProyek('');
                setDeskripsi('');

                onClose(); // Tutup modal setelah sukses
            } else {
                console.error('Detail Error:', data);
                alert('Gagal: ' + (data.message || 'Cek kembali isian Anda'));
            }
        } catch (error) {
            console.error('Koneksi Gagal:', error);
            alert('Tidak dapat terhubung ke server backend.');
        } finally {
            setLoading(false); // Selesai loading
        }
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
                    {/* PERBAIKAN 3: Tambahkan disable saat loading agar tidak di-klik 2 kali */}
                    <button className="btn-cancel" onClick={onClose} disabled={loading}>Batal</button>
                    <button className="btn-submit" onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Mengirim...' : 'Kirim Tiket'}
                    </button>
                </div>
            </div>
        </div>
    );
}