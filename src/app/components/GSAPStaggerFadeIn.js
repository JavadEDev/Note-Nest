'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function GSAPStaggerFadeIn({ children, selector = '.gsap-animate', stagger = 0.2 }) {
    const containerRef = useRef(null)

    useEffect(() => {
        if (!containerRef.current) { return }
        gsap.from(containerRef.current.querySelectorAll(selector), {
            duration: 1,
            y: 10,
            opacity: 1,
            stagger,
            ease: 'power3.in'
        })

    }, [children, selector, stagger])

    return (
        <div ref={containerRef}>
            {children}
        </div>
    )
} 