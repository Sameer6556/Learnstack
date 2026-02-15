const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
  try {
    // Check for missing environment variables
    if (!process.env.MAIL_HOST && !process.env.MAIL_USER) {
      console.log("WARNING: MAIL_HOST or MAIL_USER environment variables are missing!")
    }

    console.log("Mail Config:", {
      host: process.env.MAIL_HOST || "smtp.gmail.com",
      user: process.env.MAIL_USER,
      port: 587
    })

    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || "smtp.gmail.com", // Fallback to Gmail
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      secure: false, // true for 465, false for other ports
      port: 587,
    })

    let info = await transporter.sendMail({
      from: `"Learnstack" <${process.env.MAIL_USER}>`, // sender address
      to: `${email}`, // list of receivers
      subject: `${title}`, // Subject line
      html: `${body}`, // html body
    })
    console.log(info.response)
    return info
  } catch (error) {
    console.log("MAIL SENDING ERROR:", error.message)
    throw error
  }
}

module.exports = mailSender
