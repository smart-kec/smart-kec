const otpModel = require("../../model/OTP and Reset Models/otpVerificationModel");
const tryAgainError = { status: "failed", message: "try again" };

module.exports = async (req, res) => {
  const { userEmail } = req.body;
  console.log("Delete Otp");
  try {
    await otpModel.deleteOne({ email: userEmail });
    res
      .status(200)
      .json({ status: "success", message: "Student Account created" });
  } catch (err) {
    res.status(400).json(tryAgainError);
  }
};
