import { Geist, Geist_Mono, Short_Stack } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const shortStack = Short_Stack({
  subsets: ["latin"],
  variable: "--font-short-stack",
  display: "swap",
  weight: "400",
});

export const metadata = {
  title: "NoteNest",
  description: "NoteNest is a fast, minimalist note-taking app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${shortStack.variable} antialiased`}
      >
        <nav className="stanich-nav">
          <h1 className="stanich-title">
            <Link href="/" className="stanich-link">NoteNest</Link>
          </h1>
        </nav>
        {children}
      </body>
    </html>
  );
}
