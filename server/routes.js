const signupRouter = require("./routes/signupRoutes");
const loginRouter = require("./routes/loginRoutes");
const adminRouter = require("./routes/adminRoutes");
const auth = require("./controller/AuthController/authorizationController");
const adminLogin = require("./controller/Admin/login");

module.exports = function (app) {
  app.use("/signup", signupRouter);
  app.use("/login", loginRouter);
  app.post("/logincheck", auth.beforeAuthorization, auth.check);
  app.post(
    "/loginadmin",
    auth.beforeAuthorization,
    adminLogin.loginAuthentication
  );
  app.use("/admin", adminRouter);
};
