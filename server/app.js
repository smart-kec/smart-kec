const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cookiePareser = require("cookie-parser");
const signupRouter = require("./routes/signupRoutes");
const loginRouter = require("./routes/loginRoutes");

app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
app.use(cookiePareser());

app.use("/signup", signupRouter);
app.use("/login", loginRouter);

module.exports = app;
