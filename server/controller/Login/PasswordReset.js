const accountModel = require("../../model/accountsModel");

const passwordReset = require("../../model/OTP and Reset Models/resetModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const randomstring = require("randomstring");
const passwordRules = require("../Validation/passwordValidation");

const handleError = require("../HandleError/passwordHandler");

const emailHandler = require("../Email/emailHandler");

module.exports.checkUser = async (req, res, next) => {
  const { userEmail } = req.body;
  try {
    const user = await accountModel.findOne({ email: userEmail });
    if (user) {
      await passwordReset.deleteOne({ email: userEmail });

      next();
    } else {
      res.status(400).json({ status: "failed", message: "no user found" });
    }
  } catch (err) {
    res.status(400).json({ status: "failed", message: "try again" });
  }
};

module.exports.sendLink = async (req, res) => {
  const { userEmail, redirectUrl } = req.body;
  const randomString = randomstring.generate();

  const createdAt = Date.now();
  var expiresAt = Date.now() + 15 * 60 * 1000;

  try {
    const hashedrandomString = await bcrypt.hash(randomString, 10);
    const u = await passwordReset.create({
      email: userEmail,
      resetToken: hashedrandomString,
      createdAt,
      expiresAt,
    });
    const data = {
      from: process.env.MAIL_USER,
      to: userEmail,
      subject: "Password Reset - Smart KEC",
      html: `<p> We heard that you lost the password.</p><p>Don't worry, use the link below to reset it.</p> <p> This link <b>expires is 15 minutes</b>.</p><p>Click <a href=${
        redirectUrl + "?id=" + u.id + "&token=" + randomString
      }> here </a> to proceed.</p> <p>Kindly, reset your password before the link expiry.<p>`,
    };
    emailHandler(data, "Reset email is sent", res);
  } catch (err) {
    res.status(400).json({ status: "failed", message: err.message });
  }
};

module.exports.checkForValidToken = async (req, res, next) => {
  const { userId, resetToken } = req.body;
  try {
    const user = await passwordReset.findOne({ _id: userId });
    if (user) {
      if (Date.now() < user.expiresAt) {
        if (await bcrypt.compare(resetToken, user.resetToken)) {
          next();
        } else {
          res.status(400).json({ status: "failed", message: "Invalid token" });
        }
      } else {
        res
          .status(400)
          .json({ status: "failed", message: "Reset link has expired." });
      }
    } else {
      res.status(400).json({
        status: "failed",
        message: "Not initiated for forgot password",
      });
    }
  } catch (err) {
    res
      .status(400)
      .json({ status: "failed", message: "Error in finding the user" });
  }
};

module.exports.resetPassword = async (req, res) => {
  const { userEmail, resetPassword } = req.body;
  var checkPassword;

  try {
    checkPassword = passwordRules.validate(resetPassword, { details: true });
    if (checkPassword.length == 0) {
      const hashedPassword = await bcrypt.hash(resetPassword, 10);
      await accountModel.findOneAndUpdate(
        { email: userEmail },
        { $set: { password: hashedPassword } },
        {
          new: true,
          runValidators: true,
        }
      );
      await passwordReset.findOneAndDelete({ email: userEmail });
      res
        .status(200)
        .json({ status: "success", message: "Password reset successfully" });
    } else {
      throw new Error("Password length");
    }
  } catch (err) {
    var errors = handleError(
      err,
      { status: "failed", email: "", password: "" },
      checkPassword,
      "passwordresets"
    );
    res.status(400).json(errors);
  }
};

module.exports.getEmail = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await passwordReset.findOne({ _id: userId });
    if (user) {
      
      if (Date.now() < user.expiresAt) {
        res.status(200).json({ status: "success", email: user.email });
      } else {
        res
          .status(400)
          .json({ status: "failed", message: "Reset Link has expired." });
      }
    } else {
      res.status(400).json({
        status: "failed",
        message: "Not initiated for forgot password",
      });
    }
  } catch (err) {
    res
      .status(400)
      .json({ status: "failed", message: "Error in fetching the user" });
  }
};
