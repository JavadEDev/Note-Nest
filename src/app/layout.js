import { Geist, Geist_Mono, Short_Stack } from 'next/font/google'
import Link from 'next/link'
import './globals.css'
import AnimatedContainer from './components/AnimatedContainer'
import AuthProvider from './components/AuthProvider'
import AuthButton from './components/AuthButton'
import ToastProvider from './components/ToastProvider'

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
        <AuthProvider>
          <nav className="navigation">
            <h1 className="navigation-title">
              <Link href="/" className="navigation-logo-link">
                <img src="/note_nest_logo.webp" alt="NoteNest Logo" className="navigation-logo" />
              </Link>
            </h1>
            <div className="navigation-auth">
              <AuthButton />
            </div>
          </nav>
          <AnimatedContainer path={path}>{children}</AnimatedContainer>
          <ToastProvider />
        </AuthProvider>
      </body>
    </html>
  )
}
