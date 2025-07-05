"use client"
import { useState } from "react"

export default function RequestResetPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async () => {
    const res = await fetch("/api/auth/reset/request", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    })

    const data = await res.json()
    setMessage(data.message || data.error)
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className="w-full border p-2 rounded mb-4"
      />
      <button onClick={handleSubmit} className="bg-primary text-black px-4 py-2 rounded">
        Send Reset Link
      </button>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  )
}
