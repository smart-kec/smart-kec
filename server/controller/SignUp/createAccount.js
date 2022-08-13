const User = require("../../model/accountsModel");
const handlePasswordError = require("../HandleError/passwordHandler");
const bcrypt = require("bcrypt");
const passwordRules = require("../passwordValidation");
var checkPassword;

module.exports.saveAccount = async (req, res, next) => {
  const { email, password, type } = req.body;

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
    console.log(checkPassword);
    console.log(err.message);
    var errors = handlePasswordError(
      err,
      { status: "failed", email: "", password: "", type: "" },
      checkPassword,
      "accounts"
    );
    res.status(400).json(errors);
  }
};
