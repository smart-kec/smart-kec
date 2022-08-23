const signupRouter = require("./routes/signupRoutes");
const loginRouter = require("./routes/loginRoutes");
const adminRouter = require("./routes/adminRoutes");

module.exports = function (app) {
  app.use("/signup", signupRouter);
  app.use("/login", loginRouter);
  app.use("/admin", adminRouter);
};
