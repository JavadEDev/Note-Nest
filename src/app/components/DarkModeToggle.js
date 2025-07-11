'use client'
import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
    const [dark, setDark] = useState(false)

    useEffect(() => {
        // On mount, check localStorage or system preference
        const saved = localStorage.getItem('theme')
        if (saved) {
            setDark(saved === 'dark')
            document.documentElement.classList.toggle('dark', saved === 'dark')
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            setDark(prefersDark)
            document.documentElement.classList.toggle('dark', prefersDark)
        }
    }, [])

    const toggle = () => {
        setDark(d => {
            const newDark = !d
            document.documentElement.classList.toggle('dark', newDark)
            localStorage.setItem('theme', newDark ? 'dark' : 'light')
            return newDark
        })
    }

    return (
        <button
            onClick={toggle}
            className="darkmode-toggle-btn"
            aria-label="Toggle dark mode"
            type="button"
        >
            {dark ? '🌙' : '☀️'}
        </button>
    )
} 