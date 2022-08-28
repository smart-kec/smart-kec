const classModel = require("../../model/classModel");
const updateHandler = require("../HandleError/updateHandler");

module.exports = async (req, res) => {
  const { classId, callName, classMail, semNo, gYear, regulationYear } =
    req.body;
  try {
    const classInfo = await classModel.findOne({ _id: classId }, { _id: 1 });
    if (classInfo) {
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
      res.status(400).json({
        STATUS: "failed",
        message: "Class not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      STATUS: "failed",
      message: "Error in Class",
    });
  }
};
