import nodemailer from "nodemailer"

export async function sendVerificationRequest({
  identifier,
  url,
}: {
  identifier: string
  url: string
}) {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  })

  await transport.sendMail({
    to: identifier,
    from: process.env.EMAIL_FROM,
    subject: "Your sign-in link",
    text: `Sign in to the app: ${url}`,
    html: `<p>Sign in to the app:</p><p><a href="${url}">${url}</a></p>`,
  })

  // 👇 Do NOT return anything
}
