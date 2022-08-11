const User = require("../../model/accountsModel");
const handlError = require("../HandleError/passwordHandler");
const bcrypt = require("bcrypt");
const passwordValidation = require("password-validator");
var checkPassword;

module.exports.saveAccount = async (req, res, next) => {
  const { email, password, type } = req.body;

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
      hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ email, password: hashedPassword, type });

      next();
    } else {
      throw new Error("Password length");
    }
  } catch (err) {
    var errors = handleError(
      err,
      { status: "failed", email: "", password: "", type: "" },
      checkPassword,
      "accounts"
    );
    res.status(400).json(errors);
  }
};
