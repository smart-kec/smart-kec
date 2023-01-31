const departmentModel = require("../../model/InfoCollections/departmentInfo");
const updateHandler = require("../../controller/HandleError/updateHandler");
const staffInfoModel = require("../../model/InfoCollections/staffInfoModel");
const mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

module.exports = async (req, res) => {
  const { deptId, deptHodId } = req.body;
  try {
    if (await departmentModel.findOne({ _id: deptId }, { _id: 1 })) {
      const hod = await staffInfoModel.findOne({ _id: deptHodId }, { _id: 1 });
      if (hod) {
        await departmentModel.updateOne(
          { _id: deptId },
          { $set: { hodId: ObjectId(hod._id) } },
          { new: true, upsert: true, runValidators: true }
        );
        res.status(200).json({ status: "success", message: "Updated HoD" });
      } else {
        res
          .status(400)
          .json({ status: "failed", message: "Requested HoD not found" });
      }
    } else {
      res
        .status(400)
        .json({ status: "failed", message: "Requested Department not found" });
    }
  } catch (err) {
    const errors = updateHandler(err, {
      status: "failed",
      hodId: "",
    });
    res.status(400).json(errors);
  }
};
