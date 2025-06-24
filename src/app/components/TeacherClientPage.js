"use client"

import { useState, useEffect } from 'react'

export default function TeacherClientPage({ teacherFetchNotes, initialNotes }) {
    const [notes, setNotes] = useState(initialNotes ? initialNotes : [])
    useEffect(() => {
        const interval = setInterval(async () => {
            let since
            if (notes.length > 0) {
                since = notes[notes.length - 1]?.id ?? null
            }
            const newNotes = await teacherFetchNotes(since)
            setNotes(prevNotes => {
                const existingIds = new Set(prevNotes.map(note => note.id))
                const filteredNewNotes = newNotes.filter(note => !existingIds.has(note.id))
                return [...prevNotes, ...filteredNewNotes]
            })
        }, 5000)
        return () => clearInterval(interval)
    }, [notes, teacherFetchNotes])

    return (
        <div className="teacher-container">
            <h1 className="teacher-title">Teacher's View</h1>
            <ul className="teacher-list">
                {notes.map((note) => (
                    <li key={note.id} className="teacher-note-card">
                        <div className="teacher-note-header">
                            <span className="teacher-note-badge">from: {note.from_user}</span>
                            <span className="teacher-note-badge">to: {note.to_user}</span>
                        </div>
                        <p className="teacher-note-content">{note.note}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
