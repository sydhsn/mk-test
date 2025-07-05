"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

export default function HomePage() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex justify-between items-center p-4 shadow-md border-b bg-card">
        <h1 className="text-xl font-bold text-primary">MyApp</h1>

        <nav className="space-x-4">
          <Link href="/" className="text-muted-foreground hover:text-primary">Home</Link>
          <Link href="/about" className="text-muted-foreground hover:text-primary">About</Link>
          <Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link>

          {session?.user ? (
            <>
              <span className="text-sm text-muted-foreground">Hi, {session.user.email}</span>
              <button
                onClick={() => signOut()}
                className="px-4 py-1 rounded bg-destructive text-white hover:bg-destructive/90 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/signin">
                <button className="px-4 py-1 rounded bg-primary text-white hover:bg-primary/90 transition">
                  Login
                </button>
              </Link>
              <Link href="/auth/register">
                <button className="px-4 py-1 rounded border border-primary text-primary hover:bg-primary/10 transition">
                  Register
                </button>
              </Link>
            </>
          )}
        </nav>
      </header>

      <main className="p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Welcome to MyApp</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          This is your secure, full-stack Next.js app with authentication, password reset, and admin support.
        </p>
      </main>
    </div>
  )
}
