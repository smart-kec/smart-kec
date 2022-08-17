const otpModel = require("../../model/OTP and Reset Models/otpVerificationModel");
const handleError = require("../HandleError/handleError");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });
const emailHandler = require("../Email/emailHandler");

module.exports = async (req, res) => {
  const { userEmail } = req.body;
  // var otp = `${Math.floor(1000 + Math.random() * 900000)}`;
  var otp = Math.floor(1000 + Math.random() * 900000);

  while (otp < 100000 && otp > 999999) {
    otp = Math.floor(1000 + Math.random() * 900000);
  }

  const hashedotp = await bcrypt.hash(`${otp}`, 10);

  try {
    await otpModel.create({
      email: userEmail,
      otp: hashedotp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 300000,
    });

    const data = {
      from: process.env.MAIL_USER,
      to: userEmail,
      subject: "Verify Your Otp - Smart KEC",
      text: `OTP for your student verification in smart KEC is generated and valid for 5 mins. The OTP is ${otp} `,
    };

    emailHandler(data, "otp generated", res);
  } catch (err) {
    var errors = handleError(
      err,
      {
        status: "failed",
        email: "",
        otp: "",
      },
      "otpdetails"
    );
    res.status(400).json(errors);
  }
};
