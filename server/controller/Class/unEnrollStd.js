const classModel = require("../../model/classModel");
const studentInfoModel = require("../../model/InfoCollections/studentInfoModel");

module.exports = async (req, res) => {
  const { classId, stdId } = req.body;
  try {
    const classInfo = await classModel.findOne(
      { _id: classId },
      { studentsKeys: 1 }
    );
    const stdInfo = await studentInfoModel.findOne(
      { _id: stdId, classKey: classId },
      { _id: 1 }
    );
    if (classInfo && stdInfo) {
      classInfo.studentsKeys.remove(stdId);
      await classModel.update(
        { _id: classId },
        { studentsKeys: classInfo.studentsKeys },
        { new: true, upsert: true, runValidators: true }
      );
      await studentInfoModel.updateOne(
        { _id: stdId },
        { classKey: null, section: "Not Assigned" }
      );
      res.status(200).json({
        STATUS: "success",
        message: "Student Unenrolled successfully",
      });
    } else {
      res
        .status(400)
        .json({ STATUS: "failed", message: "Student or class not found" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ STATUS: "failed", message: "Error in un-enrolling student" });
  }
};
