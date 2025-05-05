import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "wallaclone.keepcoders@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
});

export const sendResetEmail = async (to, token) => {
  const html = `<a href="https://wallaclone.keepcoders.duckdns.org/resetpassword/${token}">Click to reset your password</a>`;

  await transporter.sendMail({
    from: '"Wallaclone" <not-reply@wallaclone.com>',
    to,
    subject: "Reset your password",
    html,
  });
};

export default sendResetEmail;
