const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const signupRouter = require("./routes/signupRoutes");

const accountCreation = require("./controller/SignUp/createAccount");
const saveInfo = require("./controller/SignUp/signupController");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
//app.post("/studentsignup", accountCreation.saveAccount, saveInfo.studentInfo);
app.use("/signup", signupRouter);

module.exports = app;
