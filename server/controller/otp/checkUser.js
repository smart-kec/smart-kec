const otpModel = require("../../model/OTP and Reset Models/otpVerificationModel");
const accountModel = require("../../model/accountsModel");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });
const tryAgainError = { status: "failed", message: "try again" };

module.exports = async (req, res, next) => {
  const { userEmail } = req.body;
  try {
    const fuser = await otpModel.find({ email: userEmail });
    if (fuser.length != 0) {
      if (fuser[0].verified) {
        const resDetails = {
          status: "success",
          message: "verified user",
        };
        res.status(201).json(resDetails);
      } else {
        try {
          await otpModel.deleteOne({ email: userEmail });
          next();
        } catch (e) {
          res.status(400).json(tryAgainError);
        }
      }
    } else {
      const user = await accountModel.find({ email: userEmail });
      if (user.length != 0) {
        res
          .status(201)
          .json({ status: "success", message: "already registered" });
      } else {
        next();
      }
    }
  } catch (err) {
    res.status(400).json(tryAgainError);
  }
};
