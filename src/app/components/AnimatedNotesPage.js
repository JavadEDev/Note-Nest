'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function AnimatedNotesPage({ notes }) {
    const containerRef = useRef(null)
    const sectionsRef = useRef([])

    useEffect(() => {
        // GSAP animations for page elements
        const tl = gsap.timeline()

        // Animate the header
        tl.from('.notes-title', {
            duration: 0.8,
            y: -50,
            opacity: 0,
            ease: 'power3.out'
        })

        tl.from('.notes-title-underline', {
            duration: 0.6,
            scaleX: 0,
            transformOrigin: 'left',
            ease: 'power2.out'
        }, '-=0.4')

        // Animate the sections with stagger
        tl.from(sectionsRef.current, {
            duration: 0.8,
            y: 60,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out'
        }, '-=0.3')

        // Animate table rows
        tl.from('.notes-table tbody tr', {
            duration: 0.6,
            x: -30,
            opacity: 0,
            stagger: 0.1,
            ease: 'power2.out'
        }, '-=0.4')
    }, [])

    const addToSectionsRef = (el) => {
        if (el && !sectionsRef.current.includes(el)) {
            sectionsRef.current.push(el)
        }
    }

    return (
        <div className="notes-container" ref={containerRef}>
            <div className="notes-header">
                <h1 className="notes-title">
                    My Notes
                    <span className="notes-title-underline"></span>
                </h1>
            </div>

            <div className="notes-grid stagger-animation">
                <div
                    className="notes-section fade-in-up"
                    ref={addToSectionsRef}
                >
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

                <div
                    className="notes-section fade-in-up"
                    ref={addToSectionsRef}
                >
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