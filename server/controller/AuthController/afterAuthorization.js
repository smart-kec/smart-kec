const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_AUTH_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res
          .status(400)
          .json({ status: "failed", message: "invalid signature" });
      } else {
        next();
      }
    });
  } else {
    res
      .status(400)
      .json({ status: "failed", message: "Token Expired or not found" });
  }
};
