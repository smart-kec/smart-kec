const otpModel = require("../../model/OTP and Reset Models/otpVerificationModel");
const accountModel = require("../../model/accountsModel");
const handleError = require("../HandleError/handleError");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });
const emailHandler = require("../Email/emailHandler");
const tryAgainError = { status: "failed", message: "try again" };
module.exports.generateAndSendEmailOtp = async (req, res) => {
  const { userEmail } = req.body;
  // var otp = `${Math.floor(1000 + Math.random() * 900000)}`;
  var otp = Math.floor(1000 + Math.random() * 900000);

  while (otp < 100000 && otp > 999999) {
    otp = Math.floor(1000 + Math.random() * 900000);
  }

  const hashedotp = await bcrypt.hash(`${otp}`, 10);

  try {
    await otpModel.create({
      email: userEmail,
      otp: hashedotp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 300000,
    });

    const data = {
      from: process.env.MAIL_USER,
      to: userEmail,
      subject: "Verify Your Otp - Smart KEC",
      text: `OTP for your student verification in smart KEC is generated and valid for 5 mins. The OTP is ${otp} `,
    };

    emailHandler(data, "otp generated", res);
  } catch (err) {
    var errors = handleError(
      err,
      {
        status: "failed",
        email: "",
        otp: "",
      },
      "otpdetails"
    );
    res.status(400).json(errors);
  }
};

module.exports.checkUser = async (req, res, next) => {
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

module.exports.isValidOtp = async (req, res) => {
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

module.exports.verifyotp = async (req, res) => {
  const { userEmail, userotp } = req.body;

  try {
    const user = await otpModel.find({ email: userEmail });
    if (user.length != 0) {
      if (Date.now() < user[0].expiresAt) {
        if (await bcrypt.compare(userotp, user[0].otp)) {
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

module.exports.isVerifiedUser = async (req, res) => {
  const { userEmail } = req.body;
  try {
    const user = await otpModel.find({ email: userEmail });
    if (user.length != 0 && user[0].verified) {
      res.status(200).json({ status: "success", message: "verified user" });
    } else {
      res.status(400).json({ status: "failed", message: "not verified user" });
    }
  } catch (err) {
    res.status(400).json(tryAgainError);
  }
};

module.exports.verifyUser = async (req, res, next) => {
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
module.exports.deleteOtp = async (req, res) => {
  const { userEmail } = req.body;
  try {
    await otpModel.deleteOne({ email: userEmail });
    res
      .status(200)
      .json({ status: "success", message: "student account created" });
  } catch (err) {
    res.status(400).json(tryAgainError);
  }
};

module.exports.resendOtp = async (req, res, next) => {
  const { userEmail } = req.body;
  try {
    const user = await otpModel.find({ email: userEmail });
    if (user.length != 0) {
      if (user[0].verified) {
        res.status(200).json({ status: "success", message: "verified user" });
      } else {
        next();
      }
    } else {
      res.status(400).json({ status: "failed", message: "user not found" });
    }
  } catch (err) {
    res.status(400).json(tryAgainError);
  }
};
