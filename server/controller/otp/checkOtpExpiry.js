const otpModel = require("../../model/OTP and Reset Models/otpVerificationModel");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });
const tryAgainError = { status: "failed", message: "try again" };

module.exports = async (req, res) => {
  const { userEmail } = req.body;
  try {
    const user = await otpModel.find({ email: userEmail });
    if (user.length != 0) {
      if (Date.now() < user[0].expiresAt) {
        res.status(200).json({ status: "success" });
      } else {
        res.status(400).json({ status: "failed", message: "otp expired" });
      }
    } else {
      res.status(400).json({ status: "failed", message: "otp not generated" });
    }
  } catch (err) {
    res.status(400).json(tryAgainError);
  }
};
