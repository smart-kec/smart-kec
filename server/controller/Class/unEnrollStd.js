const classModel = require("../../model/classModel");
const studentInfoModel = require("../../model/InfoCollections/studentInfoModel");

module.exports = async (req, res) => {
  const { classId, stdId } = req.body;
  try {
    const classInfo = await classModel.findOne(
      { _id: classId },
      { studentsKeys: 1, boysRep: 1, girlsRep: 1 }
    );
    const stdInfo = await studentInfoModel.findOne(
      { _id: stdId, classKey: classId },
      { _id: 1, gender: 1 }
    );
    if (classInfo && stdInfo) {
      classInfo.studentsKeys.remove(stdId);
      if (stdInfo.gender == "Male" && classInfo.boysRep == stdId) {
        classInfo.boysRep = null;
      } else if (stdInfo.gender == "Female" && classInfo.girlsRep == stdId) {
        classInfo.girlsRep = null;
      }
      await classModel.update(
        { _id: classId },
        {
          $set: {
            studentsKeys: classInfo.studentsKeys,
            boysRep: classInfo.boysRep,
            girlsRep: classInfo.girlsRep,
          },
        },
        { new: true, upsert: true, runValidators: true }
      );
      await studentInfoModel.updateOne(
        { _id: stdId },
        { $set: { classKey: null, section: "Not Assigned" } },
        { new: true, upsert: true, runValidators: true }
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
    res
      .status(400)
      .json({ STATUS: "failed", message: "Error in un-enrolling student" });
  }
};
