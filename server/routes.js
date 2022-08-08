const signupRouter = require("./routes/signupRoutes");
const loginRouter = require("./routes/loginRoutes");
module.exports = function(app) {
    app.use("/signup", signupRouter);
    app.use("/login", loginRouter);
};