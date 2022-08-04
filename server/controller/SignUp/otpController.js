const otpModel = require("../../model/InfoCollections/otpVerificationModel");
const accountModel = require("../../model/accountsModel");
const handleError = require("./handleErrors");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });

const tryAgainError = { status: "failed", message: "try again" };
var transporter = nodemailer.createTransport({
  service: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

module.exports.generateAndSendEmailOtp = async (req, res) => {
  const { email } = req.body;
  const otp = `${Math.floor(1000 + Math.random() * 900000)}`;
  const hashedotp = await bcrypt.hash(otp, 10);

  try {
    await otpModel.create({
      email,
      otp: hashedotp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 300000,
    });

    const data = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Verify OTP - Smart KEC",
      text: `OTP for your student verification in smart KEC is generated and valid for 5 mins. The OTP is ${otp} `,
    };
    await transporter.sendMail(data, (error, info) => {
      if (error) {
        res.status(400).json(tryAgainError);
      } else {
        res
          .status(201)
          .json({ status: "success", message: "otp generated", uotp: otp });
      }
    });
  } catch (err) {
    var errors = handleError.handleOTPError(err);
    res.status(400).json(errors);
  }
};

module.exports.checkUser = async (req, res, next) => {
  const { email } = req.body;

  try {
    const fuser = await otpModel.find({ email });
    if (fuser.length != 0) {
      if (fuser[0].verified) {
        const resDetails = {
          status: "success",
          message: "verified user",
        };
        res.status(201).json(resDetails);
      } else {
        try {
          await otpModel.deleteOne({ email });
          next();
        } catch (e) {
          res.status(400).json(tryAgainError);
        }
      }
    } else {
      const user = await accountModel.find({ email });
      if (user.length != 0) {
        res
          .status(201)
          .json({ status: "success", message: "already registered" });
      } else {
        next();
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(tryAgainError);
  }
};

module.exports.isValidOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await otpModel.find({ email });
    if (user.length != 0) {
      if (Date.now() < user[0].expiresAt) {
        res.status(201).json({ status: "success" });
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
  const { email, userotp } = req.body;

  try {
    const user = await otpModel.find({ email });
    if (user.length != 0) {
      if (Date.now() < user[0].expiresAt) {
        if (await bcrypt.compare(userotp, user[0].otp)) {
          try {
            await otpModel.findOneAndUpdate(
              { email },
              { verified: true },
              { new: true, runValidators: true }
            );
          } catch (e) {
            res.status(400).json(tryAgainError);
          }
          res.status(201).json({ status: "success", message: "otp verified" });
        } else {
          res.status(400).json({ status: "failed", message: "incorrect otp" });
        }
      } else {
        res.status(400).json({ status: "failed", message: "otp expired" });
      }
    } else {
      res.status(400).json({ status: "failed", message: "otp not generated" });
    }
  } catch (err) {}
};

module.exports.isVerifiedUser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await otpModel.find({ email });
    if (user.length != 0 && user[0].verified) {
      res.status(201).json({ status: "success", message: "verified user" });
    } else {
      res.status(400).json({ status: "failed", message: "not verified user" });
    }
  } catch (err) {
    res.status(400).json(tryAgainError);
  }
};

module.exports.verifyUser = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await otpModel.find({ email });
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
  const { email } = req.body;
  try {
    await otpModel.deleteOne({ email });
    res
      .status(201)
      .json({ status: "success", message: "student account created" });
  } catch (err) {
    res.status(400).json(tryAgainError);
  }
};

module.exports.resendOtp = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await otpModel.find({ email });
    if (user.length != 0) {
      if (user[0].verified) {
        res.status(201).json({ status: "success", message: "verified user" });
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
