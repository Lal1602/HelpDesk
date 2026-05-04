import axios from "axios";
import { useRef, useState } from "react";

export default function LoginPage({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [btnHover, setBtnHover] = useState(false);
    const [googleHover, setGoogleHover] = useState(false);
    const [msHover, setMsHover] = useState(false);
    const passwordInputRef = useRef(null);

    const browserHost = typeof window !== "undefined" ? window.location.hostname : "127.0.0.1";
    const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || `http://${browserHost}:8000`).replace(/\/$/, "");
    const api = axios.create({
        baseURL: API_BASE_URL,
        withCredentials: true,
        withXSRFToken: true,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
    });

    const ensureCsrfCookie = async () => {
        const csrfResponse = await api.get("/sanctum/csrf-cookie");

        if (csrfResponse.status < 200 || csrfResponse.status >= 300) {
            throw new Error("Gagal mengambil CSRF cookie.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedEmail = email.trim();
        if (!trimmedEmail || !password) {
            setErrorMessage("Email dan password wajib diisi.");
            return;
        }

        setErrorMessage("");
        setIsLoading(true);

        try {
            await ensureCsrfCookie();

            const { data } = await api.post("/api/login", {
                email: trimmedEmail,
                password,
            });

            const authenticatedUser = data.user || data;
            if (!authenticatedUser?.role) {
                setErrorMessage("Role user tidak ditemukan dari API Laravel.");
                return;
            }

            onLogin(authenticatedUser);
        } catch (error) {
            setErrorMessage(error?.response?.data?.message || error?.message || "Tidak dapat terhubung ke server Laravel.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            passwordInputRef.current?.focus();
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.wrapper}>
                <div style={styles.card}>
                    <div style={styles.leftPanel}>
                        <div>
                            <div style={styles.brandRow}>
                                <span style={styles.brandName}>Motion Studio&nbsp;</span>
                                <span style={styles.brandAccent}>Helpdesk+</span>
                            </div>
                            <h1 style={styles.heroText}>
                                Kembali ke
                                <br />
                                Ruang Kreatif.
                            </h1>
                        </div>

                        <div style={styles.illustrationWrapper}>
                            <div style={styles.browserMock}>
                                <div style={styles.browserBar}>
                                    <span style={styles.browserDot("#e5e7eb")} />
                                    <span style={styles.browserDot("#e5e7eb")} />
                                    <span style={styles.browserDot("#e5e7eb")} />
                                </div>
                                <div style={styles.browserContent}>
                                    <div style={styles.browserCircle} />
                                    <div style={styles.browserBlob1} />
                                    <div style={styles.browserBlob2} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <form style={styles.rightPanel} onSubmit={handleSubmit}>
                        <h2 style={styles.welcomeTitle}>Selamat Datang</h2>
                        <p style={styles.welcomeSubtitle}>
                            Silahkan masukkan akun studio untuk melanjutkan
                        </p>

                        <div style={styles.fieldGroup}>
                            <div style={styles.fieldLabelRow}>
                                <label style={styles.fieldLabel}>Alamat Email</label>
                            </div>
                            <input
                                type="email"
                                placeholder="example@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={handleEmailKeyDown}
                                onFocus={() => setEmailFocused(true)}
                                onBlur={() => setEmailFocused(false)}
                                style={{
                                    ...styles.input,
                                    ...(emailFocused ? styles.inputFocus : {}),
                                }}
                            />
                        </div>

                        <div style={styles.fieldGroup}>
                            <div style={styles.fieldLabelRow}>
                                <label style={styles.fieldLabel}>Password</label>
                                <a href="#" style={styles.forgotLink}>Lupa Password?</a>
                            </div>
                            <input
                                ref={passwordInputRef}
                                type="password"
                                placeholder="Masukkan Password..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                                style={{
                                    ...styles.input,
                                    ...(passwordFocused ? styles.inputFocus : {}),
                                }}
                            />
                        </div>

                        {errorMessage && <p style={styles.errorText}>{errorMessage}</p>}

                        <button
                            type="submit"
                            disabled={isLoading}
                            onMouseEnter={() => setBtnHover(true)}
                            onMouseLeave={() => setBtnHover(false)}
                            style={{
                                ...styles.btnMasuk,
                                ...(btnHover ? styles.btnMasukHover : {}),
                                ...(isLoading ? styles.btnMasukDisabled : {}),
                            }}
                        >
                            {isLoading ? "Memproses..." : "Masuk"}
                        </button>

                        <div style={styles.dividerRow}>
                            <div style={styles.dividerLine} />
                            <span style={styles.dividerText}>ATAU MASUK DENGAN</span>
                            <div style={styles.dividerLine} />
                        </div>

                        <div style={styles.socialRow}>
                            <button
                                type="button"
                                onMouseEnter={() => setGoogleHover(true)}
                                onMouseLeave={() => setGoogleHover(false)}
                                style={{
                                    ...styles.btnSocial,
                                    ...(googleHover ? styles.btnSocialHover : {}),
                                }}
                            >
                                <GoogleIcon />
                                Google
                            </button>
                            <button
                                type="button"
                                onMouseEnter={() => setMsHover(true)}
                                onMouseLeave={() => setMsHover(false)}
                                style={{
                                    ...styles.btnSocial,
                                    ...(msHover ? styles.btnSocialHover : {}),
                                }}
                            >
                                <MicrosoftIcon />
                                Microsoft
                            </button>
                        </div>

                        <p style={styles.footerText}>
                            Belum punya akses?{" "}
                            <a href="#" style={styles.footerLink}>Hubungi IT Pipeline</a>
                        </p>
                    </form>
                </div>
            </div>

            <footer style={styles.pageFooter}>
                MotionStudio @ 2026. All rights reserved.
            </footer>
        </div>
    );
}

const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.64 9.2045C17.64 8.5663 17.5827 7.9527 17.4764 7.3636H9V10.845H13.8436C13.635 11.97 13.0009 12.9231 12.0477 13.5613V15.8195H14.9564C16.6582 14.2527 17.64 11.9454 17.64 9.2045Z" fill="#4285F4" />
        <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5613C11.2418 14.1013 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8372 3.96409 10.71H0.957275V13.0418C2.43818 15.9831 5.48182 18 9 18Z" fill="#34A853" />
        <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.5931 3.68182 9C3.68182 8.4069 3.78409 7.83 3.96409 7.29V4.9582H0.957275C0.347727 6.1731 0 7.5477 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z" fill="#FBBC05" />
        <path d="M9 3.5795C10.3214 3.5795 11.5077 4.0336 12.4405 4.9254L15.0218 2.344C13.4632 0.8918 11.4259 0 9 0C5.48182 0 2.43818 2.0168 0.957275 4.9582L3.96409 7.29C4.67182 5.1627 6.65591 3.5795 9 3.5795Z" fill="#EA4335" />
    </svg>
);

const MicrosoftIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="8.5" height="8.5" fill="#F25022" />
        <rect x="9.5" y="0" width="8.5" height="8.5" fill="#7FBA00" />
        <rect x="0" y="9.5" width="8.5" height="8.5" fill="#00A4EF" />
        <rect x="9.5" y="9.5" width="8.5" height="8.5" fill="#FFB900" />
    </svg>
);

const styles = {
    page: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f0f2f4",
        fontFamily: "'Segoe UI', 'Inter', sans-serif",
    },
    wrapper: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
    },
    card: {
        display: "flex",
        width: "100%",
        maxWidth: "900px",
        minHeight: "560px",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
    },
    leftPanel: {
        flex: "0 0 42%",
        background: "linear-gradient(145deg, #0d9e8a 0%, #0b8a78 60%, #0a7a6a 100%)",
        padding: "36px 32px 32px 32px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
    },
    brandRow: {
        display: "flex",
        alignItems: "center",
    },
    brandName: {
        fontSize: "15px",
        fontWeight: "700",
        color: "#ffffff",
        letterSpacing: "0.01em",
    },
    brandAccent: {
        fontSize: "15px",
        fontWeight: "700",
        color: "#5ef5d8",
        letterSpacing: "0.01em",
    },
    heroText: {
        fontSize: "36px",
        fontWeight: "800",
        color: "#ffffff",
        lineHeight: "1.2",
        marginTop: "20px",
        letterSpacing: "-0.5px",
    },
    illustrationWrapper: {
        marginTop: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    browserMock: {
        width: "100%",
        maxWidth: "280px",
        backgroundColor: "rgba(255,255,255,0.95)",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
    },
    browserBar: {
        backgroundColor: "#ffffff",
        padding: "10px 14px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        borderBottom: "1px solid #e8eaed",
    },
    browserDot: (color) => ({
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        backgroundColor: color,
    }),
    browserContent: {
        height: "160px",
        background: "linear-gradient(160deg, #c8ede6 0%, #a8ddd4 40%, #d4ede8 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    browserBlob1: {
        position: "absolute",
        width: "90px",
        height: "60px",
        background: "rgba(13,158,138,0.2)",
        borderRadius: "50%",
        bottom: "20px",
        left: "20px",
        transform: "rotate(-20deg)",
    },
    browserBlob2: {
        position: "absolute",
        width: "60px",
        height: "40px",
        background: "rgba(13,158,138,0.15)",
        borderRadius: "50%",
        bottom: "10px",
        right: "30px",
    },
    browserCircle: {
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        backgroundColor: "rgba(13,158,138,0.18)",
        position: "absolute",
        top: "30px",
        left: "50%",
        transform: "translateX(-50%)",
    },
    rightPanel: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: "52px 52px 40px 52px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    welcomeTitle: {
        fontSize: "30px",
        fontWeight: "800",
        color: "#111827",
        marginBottom: "8px",
        letterSpacing: "-0.5px",
    },
    welcomeSubtitle: {
        fontSize: "14px",
        color: "#6b7280",
        marginBottom: "32px",
    },
    fieldGroup: {
        marginBottom: "20px",
    },
    fieldLabelRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "8px",
    },
    fieldLabel: {
        fontSize: "11px",
        fontWeight: "700",
        color: "#374151",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
    },
    forgotLink: {
        fontSize: "13px",
        fontWeight: "600",
        color: "#0d9e8a",
        textDecoration: "none",
        cursor: "pointer",
    },
    input: {
        width: "100%",
        padding: "14px 18px",
        fontSize: "14px",
        color: "#374151",
        backgroundColor: "#ffffff",
        border: "1.5px solid #e5e7eb",
        borderRadius: "12px",
        outline: "none",
        boxSizing: "border-box",
        transition: "border-color 0.2s",
    },
    inputFocus: {
        borderColor: "#0d9e8a",
        boxShadow: "0 0 0 3px rgba(13,158,138,0.1)",
    },
    errorText: {
        marginTop: "4px",
        marginBottom: "4px",
        fontSize: "13px",
        color: "#dc2626",
        fontWeight: "600",
    },
    btnMasuk: {
        width: "100%",
        padding: "15px",
        fontSize: "16px",
        fontWeight: "700",
        color: "#ffffff",
        backgroundColor: "#0d9e8a",
        border: "none",
        borderRadius: "12px",
        cursor: "pointer",
        transition: "background-color 0.2s",
        marginTop: "4px",
        letterSpacing: "0.02em",
    },
    btnMasukHover: {
        backgroundColor: "#0b8a78",
    },
    btnMasukDisabled: {
        opacity: "0.75",
        cursor: "not-allowed",
    },
    dividerRow: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        margin: "22px 0 18px",
    },
    dividerLine: {
        flex: 1,
        height: "1px",
        backgroundColor: "#e5e7eb",
    },
    dividerText: {
        fontSize: "11px",
        fontWeight: "700",
        color: "#9ca3af",
        letterSpacing: "0.1em",
        whiteSpace: "nowrap",
    },
    socialRow: {
        display: "flex",
        gap: "12px",
    },
    btnSocial: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        padding: "12px 16px",
        fontSize: "14px",
        fontWeight: "600",
        color: "#374151",
        backgroundColor: "#ffffff",
        border: "1.5px solid #e5e7eb",
        borderRadius: "12px",
        cursor: "pointer",
        transition: "border-color 0.2s, background-color 0.2s",
    },
    btnSocialHover: {
        borderColor: "#d1d5db",
        backgroundColor: "#f9fafb",
    },
    footerText: {
        textAlign: "center",
        marginTop: "24px",
        fontSize: "13px",
        color: "#6b7280",
    },
    footerLink: {
        fontWeight: "700",
        color: "#0d9e8a",
        textDecoration: "none",
        cursor: "pointer",
    },
    pageFooter: {
        textAlign: "center",
        padding: "16px",
        fontSize: "12px",
        color: "#9ca3af",
    },
};