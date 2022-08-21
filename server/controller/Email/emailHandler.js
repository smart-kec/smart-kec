const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});
module.exports = async (data, message, res) => {
  await transporter.sendMail(data, (error, info) => {
    if (error) {
      res.status(400).json({
        status: "failed",
        message: "An error in sending mail",
      });
    } else {
      res.status(201).json({ status: "success", message: message });
    }
  });
};
