const User = require("../../model/accountsModel");
const bcrypt = require("bcrypt");
const passwordValidation = require("password-validator");
var checkPassword;
const handleError = (err) => {
  let errors = { email: "", password: "", type: "" };
  // console.log(err);

  //Password length
  if (err.message.includes("Password length")) {
    console.log(checkPassword);
    checkPassword.forEach((mes) => {
      errors.password += mes.message + ", ";
    });
    return errors;
  }

  //Duplicate key error
  if (err.code == 11000) {
    errors.email = "This email id is already registered...";
    return errors;
  }

  //Validation Error
  if (err.message.includes("accounts validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

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
    } else {
      throw new Error("Password length");
    }
    console.log("MiddleWare Account Processed");
    next();
  } catch (err) {
    var errors = handleError(err);
    res.status(400).json(errors);
  }
};
