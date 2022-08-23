const otpModel = require("../../model/OTP and Reset Models/otpVerificationModel");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });
const tryAgainError = { status: "failed", message: "try again" };

module.exports = async (req, res) => {
  const { userEmail } = req.body;
  try {
    const user = await otpModel.findOne(
      { email: userEmail },
      { verified: 1, _id: 0 }
    );
    if (user && user.verified) {
      res.status(200).json({ status: "success", message: "verified user" });
    } else {
      res.status(400).json({ status: "failed", message: "not verified user" });
    }
  } catch (err) {
    res.status(400).json(tryAgainError);
  }
};
