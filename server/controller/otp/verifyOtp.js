const otpModel = require("../../model/OTP and Reset Models/otpVerificationModel");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });
const tryAgainError = {
  STATUS: "failed",
  message: "Try again after some time",
};

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
          res.status(200).json({ STATUS: "success", message: "otp verified" });
        } else {
          res.status(400).json({ STATUS: "failed", message: "Incorrect otp" });
        }
      } else {
        res.status(400).json({ STATUS: "failed", message: "Otp Expired" });
      }
    } else {
      res.status(400).json({ STATUS: "failed", message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(tryAgainError);
  }
};
