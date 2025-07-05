"use client"
import { signIn } from "next-auth/react"
import { useState } from "react"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSignIn = async () => {
    const res = await signIn("email", {
      email,
      redirect: false,
      callbackUrl: "/dashboard",
    })
    if (res?.ok) setMessage("Check your email for the login link.")
    else setMessage("Error logging in.")
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Sign in</h2>
      <input
        type="email"
        className="w-full border p-2 rounded mb-4"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleSignIn}
        className="bg-primary text-black w-full py-2 rounded"
      >
        Sign in with Email
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  )
}
