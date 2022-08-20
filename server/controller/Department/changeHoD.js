const departmentModel = require("../../model/InfoCollections/departmentInfo");
const updateHandler = require("../../controller/HandleError/updateHandler");
const staffInfoModel = require("../../model/InfoCollections/staffInfoModel");
module.exports = async (req, res) => {
  const { deptId, deptHodEmail } = req.body;
  try {
    if (await departmentModel.findOne({ _id: deptId })) {
      const hod = await staffInfoModel.findOne(
        { email: deptHodEmail },
        { _id: 1 }
      );
      console.log(hod);
      if (hod) {
        await departmentModel.updateOne(
          { _id: deptId },
          { $set: { hodId: hod._id } },
          { new: true, upsert: true, runValidators: true }
        );
        res.status(200).json({ status: "success", message: "Updated HoD" });
      } else {
        res.status(400).json({ status: "failed", message: "HoD not found" });
      }
    } else {
      res.status(400).json({ status: "failed", message: "Id not found" });
    }
  } catch (err) {
    const errors = updateHandler(err, {
      status: "failed",
      hodId: "",
    });
    res.status(400).json(errors);
  }
};
