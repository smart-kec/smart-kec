const otpModel = require("../../model/OTP and Reset Models/otpVerificationModel");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });
const tryAgainError = { status: "failed", message: "try again" };

module.exports = async (req, res) => {
  const { userEmail } = req.body;
  try {
    const user = await otpModel.findOne(
      { email: userEmail },
      { expiresAt: 1, _id: 0 }
    );
    if (user) {
      if (Date.now() < user.expiresAt) {
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
