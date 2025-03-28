const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.ethereal.email",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"KrishiSeva" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text: message,
  });
  console.log("Message sent: %s", info.messageId);
};

module.exports = sendEmail;
