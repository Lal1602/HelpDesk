import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

export default function LandingPage() {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        { id: 1, color: '#E8F2FF' },
        { id: 2, color: '#F0E8FF' },
        { id: 3, color: '#E8FFF5' },
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="landing-page">
            {/* Header */}
            <header className="header">
                <div className="header-container">
                    <div className="logo">
                        <span className="logo-icon">🎬</span>
                        <span className="logo-text">Motion Studio <span className="highlight">Helpdesk+</span></span>
                    </div>
                    <nav className="nav">
                        <a href="#home" className="nav-link">Home</a>
                        <a href="#about" className="nav-link">About</a>
                        <a href="#features" className="nav-link">Features</a>
                    </nav>
                    <button className="login-btn" onClick={() => navigate('/login')}>LOGIN</button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <div className="hero-left">
                        <span className="helpdesk-label">HELPDESK+</span>
                        <h1 className="hero-title">
                            Memanajemen dan<br />Mengoptimalisasi<br />
                            <span className="title-highlight">Produksi Animasi</span>
                        </h1>
                        <p className="hero-description">
                            Platform terpusat untuk melaporitak masalah render farm, pipeline, dan lisensi software secara sistematis. Berikan kepastian progres bagi para artist secara real-time.
                        </p>
                        <button className="get-started-btn" onClick={() => navigate('/login')}>Get Started</button>
                    </div>

                    <div className="hero-carousel">
                        <div className="carousel-container">
                            {slides.map((slide, idx) => (
                                <div
                                    key={slide.id}
                                    className={`slide ${idx === currentSlide ? 'active' : ''}`}
                                    style={{ backgroundColor: slide.color }}
                                >
                                    <div className="slide-content">
                                        <div className="play-icon">▶</div>
                                        <div className="dots">⋯</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="carousel-btn prev" onClick={prevSlide}>‹</button>
                        <button className="carousel-btn next" onClick={nextSlide}>›</button>
                        <div className="carousel-indicators">
                            {slides.map((_, idx) => (
                                <span
                                    key={idx}
                                    className={`indicator ${idx === currentSlide ? 'active' : ''}`}
                                    onClick={() => setCurrentSlide(idx)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="about">
                <div className="about-container">
                    <div className="about-left">
                        <h2 className="about-title">
                            Tentang <span className="highlight">Helpdesk+</span>
                        </h2>
                        <p className="about-description">
                            Di industri kreatif digital, efektivitas operational sangat bergantung pada keandalan infrastruktur TI. Namun, seringkali pelaporan masalah teknis dilakukan melalui saluran tidak resmi seperti pesan instan.
                        </p>
                        <p className="about-description">
                            Helpdesk+ adalah suatu platform untuk mengatasi misingnya data dan kurangnya transparansi progres dalam produksi.
                        </p>

                        <div className="about-features">
                            <div className="feature-item">
                                <span className="feature-number">01</span>
                                <span className="feature-title">DIGITALISASI ALUR</span>
                                <p className="feature-desc">Gantikan pelaporan manual ke sistem tiket.</p>
                            </div>
                            <div className="feature-item">
                                <span className="feature-number">02</span>
                                <span className="feature-title">PUSAT INFORMASI</span>
                                <p className="feature-desc">Satu titik kendali untuk seluruh operasional.</p>
                            </div>
                        </div>
                    </div>

                    <div className="about-right">
                        <div className="info-box">
                            <p className="info-highlight">
                                Menghilangkan redudansi laporan dan meningkatkan kepastian progres real-time pada produksi
                            </p>
                            <div className="info-items">
                                <div className="info-item">
                                    <span className="dot"></span>
                                    <span>Audit Infrastruktur TI</span>
                                </div>
                                <div className="info-item">
                                    <span className="dot"></span>
                                    <span>Manajemen Asset Digital</span>
                                </div>
                                <div className="info-item">
                                    <span className="dot"></span>
                                    <span>Knowledge Management</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Future Platform Section */}
            <section id="features" className="future-platform">
                <h2 className="section-title">Fitur Utama Platform</h2>
                <p className="section-subtitle">
                    Kami mendigitalisasi alur kerja TI pipeline untuk Motion Studio agar produksi bisa berjalan dengan optimal.
                </p>

                <div className="feature-cards">
                    <div className="feature-card">
                        <div className="card-icon">📦</div>
                        <h3>Platform Terpusat</h3>
                        <p>Wadah digital untuk pelaporan masalah teknis kerja pans mencatat teiknil secara manual otomatis yang lebih mempercepat progres.</p>
                    </div>

                    <div className="feature-card">
                        <div className="card-icon">📊</div>
                        <h3>Visualisasi Progres</h3>
                        <p>Pantau status perkerjaan proyek lama atau upda plugin secara real-time didalamnya workflow.</p>
                    </div>

                    <div className="feature-card">
                        <div className="card-icon">📚</div>
                        <h3>Knowledge Base</h3>
                        <p>Akses ribu artikel makna troubleshooting untuk masalah yang sering muncul dari aspek alur produksi tergadakan.</p>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="benefits">
                <h2 className="benefits-title">Manfaat Signifikan Bagi Seluruh Tim</h2>

                <div className="benefits-grid">
                    <div className="benefit-card">
                        <div className="benefit-number">01</div>
                        <h3 className="benefit-title">Agile Artist</h3>
                        <p className="benefit-desc">
                            Kepastian status penjelasan masalah teknis tanpa harus mengirim kan pesan instant.
                        </p>
                    </div>

                    <div className="benefit-card">
                        <div className="benefit-number">02</div>
                        <h3 className="benefit-title">Agile IT Pipeline</h3>
                        <p className="benefit-desc">
                            Pembagian tugas yang jidi dan terorganisasi sesuai bidang keahlian render. Software Hardware.
                        </p>
                    </div>

                    <div className="benefit-card">
                        <div className="benefit-number">03</div>
                        <h3 className="benefit-title">Agile Coordinator</h3>
                        <p className="benefit-desc">
                            Menghilangkan data informasi customer departemen operasional dalam komunikasi.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-left">
                    <p className="footer-logo">Motion Studio Helpdesk+</p>
                </div>
                <div className="footer-center">
                    <span>X</span>
                    <a href="#" className="social-link">Facebook</a>
                    <a href="#" className="social-link">Instagram</a>
                    <a href="#" className="social-link">LinkedIn</a>
                </div>
                <div className="footer-right">
                    <a href="#" className="social-icon">𝕏</a>
                    <a href="#" className="social-icon">f</a>
                    <a href="#" className="social-icon">📷</a>
                    <a href="#" className="social-icon">in</a>
                </div>
                <div className="footer-copyright">MotionStudio@2026. All rights reserved.</div>
            </footer>
        </div>
    );
}