const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.EMAIL_USERNAME, // Ton adresse e-mail Hotmail
      pass: process.env.EMAIL_PASSWORD, // Ton mot de passe Hotmail
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: "Takaful Team <takafuldonnation@hotmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
