const otpModel = require("../../model/OTP and Reset Models/otpVerificationModel");
const handleError = require("../HandleError/handleError");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });
const emailHandler = require("../Email/emailHandler");

module.exports = async (req, res) => {
  const { userEmail } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000);
  const hashedotp = await bcrypt.hash(`${otp}`, 10);

  try {
    await otpModel.create({
      email: userEmail,
      otp: hashedotp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 300000,
    });

    const data = {
      to: userEmail,
      subject: "Verify Otp - Smart KEC",
      text: "OTP is generated",
      html: `<p>One Time Password(OTP) for your student verification in Smart KEC is generated and valid for 5 mins. The OTP is ${otp} </p>`,
    };

    const result = await emailHandler(data);
    if (result.status == "success") {
      res.status(200).json({
        STATUS: "SUCCESS",
        message: "otp generated",
      });
    } else {
      res.status(400).json({
        STATUS: "FAILED",
        message: "otp failed",
      });
    }
  } catch (err) {
    var errors = handleError(
      err,
      {
        STATUS: "failed",
        email: "",
        otp: "",
      },
      "otpdetails"
    );
    res.status(400).json(errors);
  }
};
