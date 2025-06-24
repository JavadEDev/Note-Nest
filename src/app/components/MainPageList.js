'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'

export default function MainPageList() {
  const listRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      listRef.current.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out',
      },
    )
  }, [])

  return (
    <ul className="mainpage-list" ref={listRef}>
      <li className="mainpage-list-item">
        <Link href="/my" className="mainpage-link">
          My Notes
        </Link>
      </li>
      <li className="mainpage-list-item">
        <Link href="/write" className="mainpage-link">
          Write a Notes
        </Link>
      </li>
      <li className="mainpage-list-item">
        <Link href="/teacher" className="mainpage-link">
          Secret Teacher Feed
        </Link>
      </li>
      <li className="mainpage-list-item">
        <Link href="/who-am-i" className="mainpage-link">
          Who Am I?!
        </Link>
      </li>
    </ul>
  )
}
