const classModel = require("../../model/classModel");
const studentInfoModel = require("../../model/InfoCollections/studentInfoModel");
const updateHandler = require("../HandleError/updateHandler");

module.exports = async (req, res) => {
  const { classId, callName, classMail, semNo, gYear, regulationYear } =
    req.body;
  try { 
    const classInfo = await classModel.findOne(
      { _id: classId },
      { _id: 1, currentSemester: 1, status: 1 }
    );
    if (classInfo && classInfo.status == "ongoing") {
      try {
        await classModel.updateOne(
          { _id: classId },
          {
            $set: {
              aliasName: callName,
              classGroupMailId: classMail,
              currentSemester: semNo,
              graduationYear: gYear,
              regulation: regulationYear,
            },
          },
          { new: true, upsert: true, runValidators: true }
        );
        if (classInfo.currentSemester != semNo) {
          await studentInfoModel.updateMany(
            { classKey: classId },
            { $set: { semesterNo: semNo } },
            { new: true, upsert: true, runValidators: true }
          );
        }
        res.status(200).json({
          STATUS: "success",
          message: "Class Details updated",
        });
      } catch (err) {
        const errors = updateHandler(err, {
          STATUS: "failed",
          aliasName: "",
          classGroupMailId: "",
          currentSemester: "",
          graduationYear: "",
          regulation: "",
        });
        res.status(400).json(errors);
      }
    } else {
      if (classInfo && classInfo.status == "ended") {
        res.status(400).json({
          STATUS: "warning",
          message: "Class Ended",
        });
      } else {
        res.status(400).json({
          STATUS: "failed",
          message: "Class not found",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      STATUS: "failed",
      message: "Error in Class",
    });
  }
};
