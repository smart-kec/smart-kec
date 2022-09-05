const otpModel = require("../../model/OTP and Reset Models/otpVerificationModel");
const accountModel = require("../../model/accountsModel");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });

const tryAgainError = { STATUS: "failed", message: "error" };


module.exports = async (req, res, next) => {
  const { userEmail } = req.body;
  try {
    const fuser = await otpModel.findOne(
      { email: userEmail },
      { verified: 1, _id: 0 }
    );
    if (fuser) {
      if (fuser.verified) {
        const resDetails = {
          STATUS: "success",
          message: "verified user",
        };
        res.status(200).json(resDetails);
      } else {
        try {
          await otpModel.deleteOne({ email: userEmail });
          next();
        } catch (e) {
          res.status(400).json(tryAgainError);
        }
      }
    } else {
      const user = await accountModel.findOne(
        { email: userEmail },
        { email: 1, _id: 0 }
      );
      if (user) {
        res
          .status(200)
          .json({ STATUS: "warning", message: "already registered" });
      } else {
        next();
      }
    }
  } catch (err) {
    res.status(400).json(tryAgainError);
  }
};
