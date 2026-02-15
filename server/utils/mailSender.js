const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
  try {
    console.log("--------------------------------------------------")
    console.log("MAIL SENDER STARTED - IPv4 FORCED")
    console.log("Using Host:", process.env.MAIL_HOST || "smtp.gmail.com")
    console.log("--------------------------------------------------")

    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || "smtp.gmail.com",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      secure: false, // 587
      port: 587,
      family: 4, // Force IPv4
      logger: true, // Log to console
      debug: true, // Include debug info
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
