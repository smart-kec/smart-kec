const classModel = require("../../model/classModel");
const handleError = require("../HandleError/handleError");
const staffInfo = require("../../model/InfoCollections/staffInfoModel");
const staffInfoModel = require("../../model/InfoCollections/staffInfoModel");
const departmentModel = require("../../model/InfoCollections/departmentInfo");

module.exports = async (req, res) => {
  const {
    deptId,
    programme,
    dept,
    sec,
    Gyear,
    callName,
    advisors,
    mailId,
    presentSemester,
    yearOfGraduation,
    regulationYear,
  } = req.body;
  try {
    const deptInfo = await departmentModel.findOne(
      { _id: deptId },
      { classKeys: 1, _id: 0 }
    );
    if (deptInfo) {
      const name = programme + "-" + dept + "-" + sec + "-" + Gyear;
      try {
        const classInfo = await classModel.create({
          className: name,
          aliasName: callName,
          advisorKeys: advisors,
          classGroupMailId: mailId,
          currentSemester: presentSemester,
          graduationYear: yearOfGraduation,
          regulation: regulationYear,
        });
        var mapError = [];
        advisors.map(async (advisorId) => {
          try {
            await staffInfoModel.updateOne(
              {
                _id: advisorId,
              },
              {
                $set: {
                  classId: classInfo._id,
                },
              },
              { new: true, upsert: true, runValidators: true }
            );
          } catch (error) {
            mapError.push(advisorId);
          }
        });
        if (mapError.length) {
          res
            .status(400)
            .json({ status: "failed", message: "Error in assigning advisors" });
        } else {
          try {
            deptInfo.classKeys.push(classInfo._id);
            await departmentModel.updateOne(
              { _id: deptId },
              { $set: { classKeys: deptInfo.classKeys } },
              { new: true, upsert: true, runValidators: true }
            );
          } catch (er) {}
          res.status(201).json({ status: "success", message: "Class Created" });
        }
      } catch (err) {
        res.status(400).json(
          handleError(
            err,
            {
              status: "failed",
              className: "",
              aliasName: "",
              advisorKeys: "",
              classGroupMailId: "",
              currentSemester: "",
              graduationYear: "",
              regulation: "",
            },
            "classes"
          )
        );
      }
    } else {
      res.status(400).json({
        status: "failed",
        message: "Dept not found",
      });
    }
  } catch (deptError) {
    res
      .status(400)
      .json({ status: "failed", message: "Error in finding dept" });
  }
};
