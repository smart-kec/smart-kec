const otpModel = require("../../model/OTP and Reset Models/otpVerificationModel");
const handleError = require("../HandleError/handleError");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });
const emailHandler = require("../Email/emailHandler");

module.exports = async (req, res) => {
  const { userEmail } = req.body;
  const otp = Math.floor(10000 + Math.random() * 900000);
  const hashedotp = await bcrypt.hash(`${otp}`, 10);
  console.log(userEmail);
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
