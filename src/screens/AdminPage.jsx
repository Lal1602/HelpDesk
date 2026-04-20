export default function AdminPage({ user, onLogout }) {
    return (
        <div style={styles.container}>
            <nav style={styles.navbar}>
                <h2 style={styles.logo}>AdminPanel</h2>
                <button style={styles.logoutBtn} onClick={onLogout}>
                    Logout
                </button>
            </nav>

            <main style={styles.main}>
                <div style={styles.welcomeCard}>
                    <h1 style={styles.title}>Selamat Datang, {user?.email || "Admin"}!</h1>
                    <p style={styles.subtitle}>
                        Ini adalah tampilan dashboard dummy menggunakan pola StyleSheet ala React Native.
                    </p>
                    <div style={styles.statsRow}>
                        <div style={styles.statBox}>User: 120</div>
                        <div style={styles.statBox}>Posts: 45</div>
                        <div style={styles.statBox}>Alerts: 2</div>
                    </div>
                </div>
            </main>
        </div>
    );
}


const styles = {
    container: {
        backgroundColor: '#f0f2f5',
        minHeight: '100vh',
        fontFamily: 'Segoe UI, Roboto, sans-serif',
    },
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        backgroundColor: '#ffffff',
        height: '60px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    logo: {
        color: '#007AFF',
        fontSize: '20px',
        margin: 0,
    },
    logoutBtn: {
        backgroundColor: '#ff3b30',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    main: {
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
    },
    welcomeCard: {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '800px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    title: {
        margin: '0 0 10px 0',
        color: '#1c1e21',
    },
    subtitle: {
        color: '#606770',
        lineHeight: '1.5',
    },
    statsRow: {
        display: 'flex',
        gap: '15px',
        marginTop: '25px',
    },
    statBox: {
        flex: 1,
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        textAlign: 'center',
        fontWeight: 'bold',
        border: '1px solid #ddd',
    },
};