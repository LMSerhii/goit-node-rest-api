import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.ukr.net",
  port: 2525,
  secure: true,
  auth: {
    user: process.env.MAIL_NAME,
    pass: process.env.MAIL_PSW,
  },
});

export const sendEmail = async ({ email, subject, html }) => {
  await transporter.sendMail({
    from: process.env.MAIL_NAME,
    to: email,
    subject: subject,
    html: html,
  });

  console.log("email sent");
};
