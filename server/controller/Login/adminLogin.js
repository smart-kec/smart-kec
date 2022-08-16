const adminModel = require("../../model/Admin/adminModel");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });
const jwt = require("jsonwebtoken");

const maxAge = 60; //seconds

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_AUTH_ADMINSECRET, {
    expiresIn: maxAge,
  });
};

module.exports = async (req, res) => {
  const { AdminEmail, AdminPassword } = req.body;
  try {
    const user = await adminModel.login(AdminEmail, AdminPassword);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ status: "success", id: user._id });
  } catch (err) {
    res.status(400).json({ status: "failed", message: err.message });
  }
};
