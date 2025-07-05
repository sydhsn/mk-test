import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) return redirect("/auth/signin")

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome {session.user?.email}</h1>
      <p>Your role: {session.user?.role || "USER"}</p>
    </div>
  )
}
