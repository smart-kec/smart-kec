const accountsModel = require("../../model/accountsModel");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });
const jwt = require("jsonwebtoken");

const maxAge = 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_AUTH_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.loginAuthentication = async (req, res) => {
  const { email, password, type } = req.body;
  try {
    const user = await accountsModel.login(email, password, type);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ status: "success", id: user._id });
  } catch (err) {
    res.status(400).json({ status: "failed", message: err.message });
  }
};
