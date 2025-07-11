'use client'
import { useRef, useTransition } from 'react'
import postNote from '../api/postNote'
import { ToastEmitter } from './ToastProvider'

export default function WriteNoteForm({ users, myId, myName }) {
    const formRef = useRef(null)
    const [isPending, startTransition] = useTransition()

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(formRef.current)
        startTransition(async () => {
            try {
                await postNote(formData)
                ToastEmitter.success('Note sent successfully!')
                formRef.current.reset()
            } catch (e) {
                ToastEmitter.error('Failed to send note: ' + (e?.message || e))
            }
        })
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="write-form">
            <label className="write-label">
                From
                <input
                    type="text"
                    value={myName}
                    disabled
                    className="write-input write-input-disabled"
                />
            </label>
            <label className="write-label">
                To
                <select name="to_user" className="write-select">
                    {users.filter((user) => user.id !== myId).map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name || user.email}
                        </option>
                    ))}
                </select>
            </label>
            <label className="write-label">
                Note
                <textarea name="note" className="write-textarea" />
            </label>
            <button type="submit" className="write-button" disabled={isPending}>
                {isPending ? 'Sending...' : 'Send'}
            </button>
        </form>
    )
} 