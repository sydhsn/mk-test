// components/ServerSession.tsx
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Link from "next/link"

export default async function ServerSession() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <div className="text-muted-foreground">
        Not signed in. <Link href="/auth/signin" className="text-primary underline">Sign in</Link>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <p className="text-primary font-semibold">Welcome, {session.user?.email}</p>
      <Link href="/api/auth/signout" className="text-red-500 underline">
        Sign out
      </Link>
    </div>
  )
}
