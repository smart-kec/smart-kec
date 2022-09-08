const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: `${__dirname}/config.env` });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    //useCreateIndex:true,
    useUnifiedTopology: true,
    //  useFindAndModify:false
  })
  .then(() => {
    console.log("DB Connection Successfull");
  })
  .catch((err) => {
    console.log("Error");
    console.log(err);
  });

const port = process.env.port;

app.listen(port, () => {
  console.log("Server started");
  console.log(`App running on port ${port}`);
});
