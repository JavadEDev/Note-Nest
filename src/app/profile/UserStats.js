export default function UserStats({ stats }) {
    return (
        <div className="profile-section">
            <h2 className="profile-section-title">Statistics</h2>
            <div className="profile-stats">
                <div className="profile-stat-card">
                    <div className="profile-stat-number">{stats.notes_sent || 0}</div>
                    <div className="profile-stat-label">Notes Sent</div>
                </div>
                <div className="profile-stat-card">
                    <div className="profile-stat-number">{stats.notes_received || 0}</div>
                    <div className="profile-stat-label">Notes Received</div>
                </div>
                <div className="profile-stat-card">
                    <div className="profile-stat-number">{(stats.notes_sent || 0) + (stats.notes_received || 0)}</div>
                    <div className="profile-stat-label">Total Notes</div>
                </div>
            </div>
        </div>
    );
} 