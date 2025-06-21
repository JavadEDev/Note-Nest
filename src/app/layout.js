import { Geist, Geist_Mono, Short_Stack } from 'next/font/google'
import Link from 'next/link'
import './globals.css'
import AnimatedContainer from './components/AnimatedContainer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const shortStack = Short_Stack({
  subsets: ['latin'],
  variable: '--font-short-stack',
  display: 'swap',
  weight: '400',
})

export const metadata = {
  title: 'NoteNest',
  description: 'NoteNest is a fast, minimalist note-taking app',
}

export default function RootLayout({ children }) {
  const path = ''

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${shortStack.variable} antialiased`}
      >
        <nav className="navigation">
          <h1 className="navigation-title">
            <Link href="/" className="navigation-link">
              NoteNest
            </Link>
          </h1>
        </nav>
        <AnimatedContainer path={path}>{children}</AnimatedContainer>
      </body>
    </html>
  )
}
