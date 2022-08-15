const accountModel = require("../../model/accountsModel");

const passwordReset = require("../../model/OTP and Reset Models/resetModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const randomstring = require("randomstring");
const passwordRules = require("../Validation/passwordValidation");

const handleError = require("../HandleError/passwordHandler");

const emailHandler = require("../Email/emailHandler");

module.exports.checkUser = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await accountModel.findOne({ email });
    if (user) {
      req.body.id = user._id;

      await passwordReset.deleteOne({ email });

      next();
    } else {
      res.status(400).json({ status: "failed", message: "no user found" });
    }
  } catch (err) {
    res.status(400).json({ status: "failed", message: "try again" });
  }
};

module.exports.sendLink = async (req, res) => {
  const { email, id, redirectUrl } = req.body;
  const randomString = randomstring.generate();

  console.log(Date(Date.now()));
  const createdAt = Date.now();
  var expiresAt = Date.now() + 15 * 60 * 1000;

  console.log(createdAt, expiresAt);
  try {
    const hashedrandomString = await bcrypt.hash(randomString, 10);
    const u = await passwordReset.create({
      email,
      resetToken: hashedrandomString,
      createdAt,
      expiresAt,
    });
    console.log(u);
    const data = {
      from: process.env.MAIL_USER,
      to: email,
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
      // console.log(user);
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
  const { email, password } = req.body;
  var checkPassword;

  try {
    checkPassword = passwordRules.validate(password, { details: true });
    if (checkPassword.length == 0) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await accountModel.findOneAndUpdate(
        { email },
        { $set: { password: hashedPassword } },
        {
          new: true,
          runValidators: true,
        }
      );
      await passwordReset.findOneAndDelete({ email });
      res
        .status(201)
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
      // console.log(user, Date.now());
      if (Date.now() < user.expiresAt) {
        res.status(201).json({ status: "success", email: user.email });
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
