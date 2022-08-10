// const adminModel = require("../../model/Admin/adminModel");
// const bcrypt = require("bcrypt");

// module.exports.createAcc = async (req, res) => {
//   const { email, password, type } = req.body;
//   try {
//     await adminModel.create({
//       email,
//       password: await bcrypt.hash(password, 10),
//       type,
//     });
//     res.status(201).json({
//       status: "success",
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "failed",
//       message: err.message,
//     });
//   }
// };
