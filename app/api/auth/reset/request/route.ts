import { PrismaClient } from "@prisma/client"
import { randomBytes } from "crypto"
import { addMinutes } from "date-fns"
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const token = randomBytes(32).toString("hex")
    const expires = addMinutes(new Date(), 15)

    await prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expiresAt: expires,     // ✅ use expiresAt
        userId: user.id,        // ✅ use user.id
      },
    })

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset/${token}`

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST!,
      port: Number(process.env.EMAIL_SERVER_PORT!),
      auth: {
        user: process.env.EMAIL_SERVER_USER!,
        pass: process.env.EMAIL_SERVER_PASSWORD!,
      },
    })

    await transporter.sendMail({
      to: email,
      from: process.env.EMAIL_FROM!,
      subject: "Reset your password",
      html: `
        <div style="font-family:sans-serif; line-height:1.4">
          <h2>Reset Your Password</h2>
          <p>Click below to reset:</p>
          <a href="${resetUrl}" style="background:#1e40af; color:white; padding:10px 15px; border-radius:5px; text-decoration:none">Reset Password</a>
          <p>This link expires in 15 minutes.</p>
        </div>
      `,
    })

    return NextResponse.json({ message: "Reset link sent" })
  } catch (err) {
    console.error("Reset request error:", err)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
