const departmentModel = require("../../model/InfoCollections/departmentInfo");
const updateHandler = require("../../controller/HandleError/updateHandler");
module.exports = async (req, res) => {
  const { deptId, deptHodEmail } = req.body;
  try {
    await departmentModel.updateOne(
      { _id :deptId },
      { $set: { hodEmail : deptHodEmail } },
      { new: true, upsert: true, runValidators: true }
    );
    res.status(200).json({ status: "success", message: "Updated HoD" });
  } catch (err) {
    const errors = updateHandler(err, {
      status: "failed",
      hodEmail: "",
    });
    res.status(400).json(errors);
  }
};
