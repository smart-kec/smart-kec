const accountModel = require("../../model/accountsModel");

const passwordReset = require("../../model/OTP and Reset Models/resetModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const randomstring = require("randomstring");
const passwordValidation = require("password-validator");
const handleError = require("../HandleError/handleErrors");

var transporter = nodemailer.createTransport({
  service: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

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
  const data = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Password Reset - Smart KEC",
    html: `<p> We heard that you lost the password.</p><p>Don't worry, use the link below to reset it.</p> <p> This link <b>expires is 15 minutes</b>.</p><p>Click <a href=${
      redirectUrl + "?id=" + id + "&token=" + randomString
    }> here </a> to proceed.</p> <p>Kindly, reset your password before the link expiry.<p>`,
  };
  const createdAt = Date.now();
  const expiresAt = createdAt + 900000;
  try {
    const hashedrandomString = await bcrypt.hash(randomString, 10);
    await passwordReset.create({
      email,
      userId: id,
      resetToken: hashedrandomString,
      createdAt,
      expiresAt,
    });
    await transporter.sendMail(data, (error, info) => {
      if (error) {
        res
          .status(400)
          .json({ status: "failed", message: "An error in sending mail" });
      } else {
        res
          .status(201)
          .json({ status: "success", message: "reset email is sent" });
      }
    });
  } catch (err) {
    res.status(400).json({ status: "failed", message: err.message });
  }
};

module.exports.checkForValidToken = async (req, res, next) => {
  const { userId, resetToken } = req.body;
  try {
    const user = await passwordReset.findOne({ userId });
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
      .json({ status: "failed", message: "Error in finding the user" });
  }
};

module.exports.resetPassword = async (req, res) => {
  const { email, password } = req.body;
  var checkPassword;
  var passwordRules = new passwordValidation();
  passwordRules
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(100) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(2) // Must have at least 2 digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123", email]); // Blacklist these values

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
    var errors = handleError.handlePasswordResetError(err, checkPassword);
    res.status(400).json(errors);
  }
};

module.exports.getEmail = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await passwordReset.findOne({ userId });
    if (user) {
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
