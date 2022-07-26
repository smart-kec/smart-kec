const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
const loginRouter = require("./routes/loginRoutes");

// app.use('/login',loginRouter);


module.exports = app;
