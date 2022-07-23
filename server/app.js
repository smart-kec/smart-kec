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
const studentInfoRouter = require("./routes/studentInfoRoutes");
const organizerInfoRouter = require("./routes/organizerInfoRoutes");
const eventInfoRouter = require("./routes/eventInfoRoutes");
const registrationRouter = require("./routes/registrationRoutes");

// app.use('/login',loginRouter);
// app.use('/student',studentInfoRouter);
// app.use('/organizer',organizerInfoRouter);
// app.use('/event',eventInfoRouter);
// app.use('/registration',registrationRouter);

module.exports = app;
