const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const sendEmail = asyncHandler(async ({email,subject,html}) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, 
      auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });
      const info = await transporter.sendMail({
        from: '"Apple" <no-reply@apple.com>', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        html: html, // html body
      });
      return info
    
  })
  module.exports = sendEmail
