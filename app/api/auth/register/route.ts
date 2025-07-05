// app/api/auth/register/route.ts
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    const hashed = await bcrypt.hash(password, 10)
    await prisma.user.create({ data: { email, password: hashed } })

    return NextResponse.json({ message: "Registered successfully" })
  } catch (err) {
    console.error("REGISTER ERROR", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
