"use client"

import { useState, useEffect } from 'react'
import deleteNote from '../api/deleteNote'
import editNote from '../api/editNote'
import { ToastEmitter } from './ToastProvider'

export default function TeacherClientPage({ teacherFetchNotes, initialNotes }) {
    const [notes, setNotes] = useState(initialNotes ? initialNotes : [])
    const [editingId, setEditingId] = useState(null)
    const [editValue, setEditValue] = useState("")
    const [actionLoading, setActionLoading] = useState(false)

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

    const handleDelete = async (id) => {
        setActionLoading(true)
        try {
            const formData = new FormData()
            formData.append("id", id)
            await deleteNote(formData)
            setNotes(notes => notes.filter(note => note.id !== id))
            ToastEmitter.success('Note deleted successfully!')
        } catch (e) {
            ToastEmitter.error("Failed to delete note: " + e.message)
        } finally {
            setActionLoading(false)
        }
    }

    const handleEdit = (id, currentNote) => {
        setEditingId(id)
        setEditValue(currentNote)
    }

    const handleEditSave = async (id) => {
        setActionLoading(true)
        try {
            const formData = new FormData()
            formData.append("id", id)
            formData.append("note", editValue)
            await editNote(formData)
            setNotes(notes => notes.map(note => note.id === id ? { ...note, note: editValue } : note))
            setEditingId(null)
            setEditValue("")
            ToastEmitter.success('Note updated successfully!')
        } catch (e) {
            ToastEmitter.error("Failed to edit note: " + e.message)
        } finally {
            setActionLoading(false)
        }
    }

    const handleEditCancel = () => {
        setEditingId(null)
        setEditValue("")
    }

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
                        {editingId === note.id ? (
                            <div style={{ marginBottom: '1rem' }}>
                                <textarea
                                    className="teacher-edit-textarea"
                                    value={editValue}
                                    onChange={e => setEditValue(e.target.value)}
                                    rows={3}
                                    disabled={actionLoading}
                                />
                                <div className="teacher-note-actions">
                                    <button onClick={() => handleEditSave(note.id)} disabled={actionLoading} className="teacher-edit-btn" style={{ marginRight: 8 }}>Save</button>
                                    <button onClick={handleEditCancel} disabled={actionLoading} className="teacher-edit-btn">Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <p className="teacher-note-content">{note.note}</p>
                        )}
                        <div className="teacher-note-actions">
                            <button onClick={() => handleEdit(note.id, note.note)} disabled={actionLoading || editingId === note.id} className="teacher-edit-btn" style={{ marginRight: 8 }}>Edit</button>
                            <button onClick={() => handleDelete(note.id)} disabled={actionLoading} className="teacher-delete-btn">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
