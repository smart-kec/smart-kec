const classModel = require("../../model/classModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
module.exports = async (req, res) => {
  const { boyKey, girlKey, classId } = req.body;
  try {
    const classInfo = await classModel.findOne(
      { _id: classId, studentsKeys: { $all: [boyKey, girlKey] } },
      { _id: 1, status: 1 }
    );
    if (classInfo && classInfo.status == "ongoing") {
      await classModel.updateOne(
        { _id: classId },
        { $set: { boysRep: ObjectId(boyKey), girlsRep: ObjectId(girlKey) } },
        { new: true, upsert: true, runValidators: true }
      );
      res.status(200).json({
        STATUS: "success",
        message: "Representative Choosed successfully",
      });
    } else {
      if (classInfo && classInfo.status == "ended") {
        res.status(400).json({
          STATUS: "warning",
          message: "Class Ended",
        });
      } else {
        res.status(400).json({
          STATUS: "failed",
          message: "Student is not enrolled in this class or class not found",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      STATUS: "failed",
      message: "Error in choosing Representative",
    });
  }
};
