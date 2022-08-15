const User = require("../../model/accountsModel");
const handlePasswordError = require("../HandleError/passwordHandler");
const bcrypt = require("bcrypt");
const passwordRules = require("../Validation/passwordValidation");
var checkPassword;

module.exports.saveAccount = async (req, res, next) => {
  const { userEmail, userPassword, userType } = req.body;

  try {
    checkPassword = passwordRules.validate(userPassword, { details: true });
    if (checkPassword.length == 0) {
      hashedPassword = await bcrypt.hash(userPassword, 10);
      const user = await User.create({
        email: userEmail,
        password: hashedPassword,
        type: userType,
      });

      next();
    } else {
      throw new Error("Password length");
    }
  } catch (err) {
    var errors = handlePasswordError(
      err,
      { status: "failed", email: "", password: "", type: "" },
      checkPassword,
      "accounts"
    );
    res.status(400).json(errors);
  }
};
