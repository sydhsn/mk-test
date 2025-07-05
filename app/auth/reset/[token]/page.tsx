"use client"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const { token } = useParams()
  const router = useRouter()

  const handleSubmit = async () => {
    const res = await fetch("/api/auth/reset/confirm", {
      method: "POST",
      body: JSON.stringify({ token, password }),
      headers: { "Content-Type": "application/json" },
    })

    const data = await res.json()
    setMessage(data.message || data.error)

    if (data.message) {
      setTimeout(() => router.push("/auth/signin"), 2000)
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New password"
        className="w-full border p-2 rounded mb-4"
      />
      <button onClick={handleSubmit} className="bg-primary text-white px-4 py-2 rounded">
        Reset Password
      </button>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  )
}
