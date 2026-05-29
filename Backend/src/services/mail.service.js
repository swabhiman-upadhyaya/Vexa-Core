import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    clientId: process.env.GOOGLE_CLIENT_ID,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  }
})

transporter.verify()
  .then(() => {
    console.log("Ready to send emails")
  })
  .catch((error) => {
    console.error("Error setting up email transporter:", error)
  })

export async function sendEmail(to, subject, html) {
  const mailOptions = {
    from: process.env.GOOGLE_USER,
    to,
    subject,
    html,
  }

  const details = await transporter.sendMail(mailOptions)
  console.log(`Email sent to: ${to}`)
}