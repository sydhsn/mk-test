// /app/api/auth/login/route.ts
import { PrismaClient } from "@prisma/client"
import { compare } from "bcryptjs"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !user.password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  const isValid = await compare(password, user.password)
  if (!isValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  // Auth session is handled by NextAuth, so usually you'd call signIn here on the client.
  return NextResponse.json({ message: "Login successful" })
}
