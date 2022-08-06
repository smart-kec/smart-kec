const accountModel = require("../../model/accountsModel");
const { v4: uuidv4 } = require("uuid");
const passwordReset = require("../../model/OTP and Reset Models/resetModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

var transporter = nodemailer.createTransport({
  service: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

module.exports.checkUser = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await accountModel.findOne({ email });
    if (user) {
      req.body.id = user._id;

      await passwordReset.deleteOne({ email });

      next();
    } else {
      res.status(400).json({ status: "failed", message: "no user found" });
    }
  } catch (err) {
    res.status(400).json({ status: "failed", message: "try again" });
  }
};

module.exports.sendLink = async (req, res) => {
  const { email, id, redirectUrl } = req.body;
  const resetString = uuidv4 + id;
  console.log(resetString);
  const data = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Password Reset - Smart KEC",
    html: `<p> We heard that you lost the password.</p><p>Don't worry, use the link below to reset it.</p> <p> This link <b>expires is 15 minutes</b>.</p><p>Click <a href=${
      redirectUrl + "/" + id + "/" + resetString
    }> here </a> to proceed.</p>`,
  };
  const createdAt = Date.now();
  const expiresAt = createdAt + 900000;
  try {
    const hashedResetString = await bcrypt.hash(resetString, 10);
    await passwordReset.create({
      email,
      userId: id,
      resetLink: hashedResetString,
      createdAt,
      expiresAt,
    });
    await transporter.sendMail(data, (error, info) => {
      if (error) {
        res
          .status(400)
          .json({ status: "failed", message: "An error in sending mail" });
      } else {
        res
          .status(201)
          .json({ status: "success", message: "reset email is sent" });
      }
    });
  } catch (err) {
    res.status(400).json({ status: "failed", message: err.message });
  }
};
