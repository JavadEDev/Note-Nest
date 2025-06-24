export default function LoadingMyNotesSkeleton() {
    return (
        <div className="notes-container">
            <div className="notes-header">
                <h1 className="notes-title skeleton skeleton-title">My Notes</h1>
            </div>
            <div className="notes-grid">
                {[0, 1].map((section) => (
                    <div className="notes-section" key={section}>
                        <div className="notes-legend skeleton skeleton-legend" style={{ width: 120, height: 20 }} />
                        <table className="notes-table">
                            <thead>
                                <tr>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Note</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...Array(3)].map((_, i) => (
                                    <tr key={i}>
                                        <td>
                                            <span className="user-badge skeleton" style={{ width: 60, height: 20 }} />
                                        </td>
                                        <td>
                                            <span className="user-badge skeleton" style={{ width: 60, height: 20 }} />
                                        </td>
                                        <td>
                                            <span className="note-content skeleton" style={{ width: 180, height: 20 }} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    )
}
