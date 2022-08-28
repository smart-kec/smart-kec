const studentInfoModel = require("../../model/InfoCollections/studentInfoModel");
const mongoose = require("mongoose");
const classModel = require("../../model/classModel");
const ObjectId = mongoose.Types.ObjectId;
module.exports = async (req, res) => {
  const { stdKeys, classId } = req.body;
  try {
    const checkStd = await studentInfoModel.find(
      { _id: { $in: stdKeys } },
      { _id: 1 }
    );
    const classInfo = await classModel.findOne(
      { _id: classId },
      { studentsKeys: 1, section: 1 }
    );
    if (checkStd.length == stdKeys.length && classInfo) {
      var stdId = classInfo.studentsKeys;
      stdKeys.map((key) => {
        stdId.push(ObjectId(key));
      });
      await studentInfoModel.updateMany(
        { _id: { $in: stdKeys } },
        { classKey: classId, section: classInfo.section },
        { new: true, upsert: true, runValidators: true }
      );
      await classModel.updateOne(
        { _id: classId },
        { studentsKeys: stdId },
        { new: true, upsert: true, runValidators: true }
      );
      res
        .status(200)
        .json({ STATUS: "success", message: "Students enrolled successfully" });
    } else {
      res.status(400).json({
        STATUS: "failed",
        message: "Mismatch in Student Id's or requested class not found",
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ STATUS: "failed", message: "Error in enrolling students" });
  }
};
