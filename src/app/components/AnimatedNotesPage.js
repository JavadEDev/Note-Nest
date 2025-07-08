export default function AnimatedNotesPage({ notes }) {
    return (
        <div className="notes-container">
            <div className="notes-header">
                <h1 className="notes-title">
                    My Notes
                    <span className="notes-title-underline"></span>
                </h1>
            </div>

            <div className="notes-grid stagger-animation">
                <div className="notes-section fade-in-up gsap-animate">
                    <div className="notes-legend">📥 Notes To You</div>
                    <table className="notes-table">
                        <thead>
                            <tr>
                                <th>From</th>
                                <th>To</th>
                                <th>Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notes.to.length > 0 ? (
                                notes.to.map(({ id, note, from_user, to_user }) => (
                                    <tr key={id}>
                                        <td>
                                            <span className="user-badge">{from_user}</span>
                                        </td>
                                        <td>
                                            <span className="user-badge">{to_user}</span>
                                        </td>
                                        <td className="note-content">{note}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">
                                        <div className="empty-state">
                                            <div className="empty-state-icon">📭</div>
                                            <p>No notes received yet</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="notes-section fade-in-up gsap-animate">
                    <div className="notes-legend">📤 Notes From You</div>
                    <table className="notes-table">
                        <thead>
                            <tr>
                                <th>From</th>
                                <th>To</th>
                                <th>Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notes.from.length > 0 ? (
                                notes.from.map(({ id, note, from_user, to_user }) => (
                                    <tr key={id}>
                                        <td>
                                            <span className="user-badge">{from_user}</span>
                                        </td>
                                        <td>
                                            <span className="user-badge">{to_user}</span>
                                        </td>
                                        <td className="note-content">{note}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">
                                        <div className="empty-state">
                                            <div className="empty-state-icon">📝</div>
                                            <p>No notes sent yet</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
} 