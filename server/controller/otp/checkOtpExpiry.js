const otpModel = require("../../model/OTP and Reset Models/otpVerificationModel");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });
const tryAgainError = {
  STATUS: "failed",
  message: "Try again after some time",
};

module.exports = async (req, res) => {
  const { userEmail } = req.body;
  try {
    const user = await otpModel.findOne(
      { email: userEmail },
      { expiresAt: 1, _id: 0 }
    );
    if (user) {
      if (Date.now() < user.expiresAt) {
        res.status(200).json({ STATUS: "success" });
      } else {
        res.status(400).json({ STATUS: "failed", message: "Otp expired" });
      }
    } else {
      res.status(400).json({ STATUS: "failed", message: "User not found" });
    }
  } catch (err) {
    res.status(400).json(tryAgainError);
  }
};
