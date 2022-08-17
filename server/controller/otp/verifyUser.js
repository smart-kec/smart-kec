const otpModel = require("../../model/OTP and Reset Models/otpVerificationModel");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });
const tryAgainError = { status: "failed", message: "try again" };

module.exports = async (req, res, next) => {
  const { userEmail } = req.body;
  try {
    const user = await otpModel.find({ email: userEmail });
    if (user.length != 0 && user[0].verified) {
      next();
    } else {
      res.status(400).json({ status: "failed", message: "not verified user" });
    }
  } catch (err) {
    res.status(400).json(tryAgainError);
  }
};
