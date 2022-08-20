const otpModel = require("../../model/OTP and Reset Models/otpVerificationModel");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });
const tryAgainError = { status: "failed", message: "try again" };

module.exports = async (req, res) => {
  const { userEmail, userotp } = req.body;

  try {
    const user = await otpModel.findOne(
      { email: userEmail },
      { expiresAt: 1, otp: 1, _id: 0 }
    );
    if (user) {
      if (Date.now() < user.expiresAt) {
        if (await bcrypt.compare(userotp, user.otp)) {
          try {
            await otpModel.findOneAndUpdate(
              { email: userEmail },
              { verified: true },
              { new: true, runValidators: true }
            );
          } catch (e) {
            res.status(400).json(tryAgainError);
          }
          res.status(200).json({ status: "success", message: "otp verified" });
        } else {
          res.status(400).json({ status: "failed", message: "incorrect otp" });
        }
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
