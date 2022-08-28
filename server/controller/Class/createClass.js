const classModel = require("../../model/classModel");
const handleError = require("../HandleError/handleError");
const staffInfoModel = require("../../model/InfoCollections/staffInfoModel");
const departmentModel = require("../../model/InfoCollections/departmentInfo");
const mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
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
      const advisorsInfo = await staffInfoModel.find(
        { _id: { $in: advisors }, classId: null },
        { _id: 1 }
      );

      var advKey = [];
      advisors.map((a) => {
        advKey.push(ObjectId(a));
      });
      if (advisorsInfo.length == advisors.length) {
        try {
          const classInfo = await classModel.create({
            className: name,
            aliasName: callName,
            section: sec,
            advisorKeys: advKey,
            classGroupMailId: mailId,
            deptId: ObjectId(deptId),
            currentSemester: presentSemester,
            graduationYear: yearOfGraduation,
            regulation: regulationYear,
          });

          try {
            await staffInfoModel.update(
              {
                _id: { $in: advisors },
              },
              {
                $set: {
                  classId: classInfo._id,
                },
              },
              { new: true, runValidators: true, upsert: true }
            );
            deptInfo.classKeys.push(ObjectId(classInfo._id));
            await departmentModel.updateOne(
              { _id: deptId },
              { $set: { classKeys: deptInfo.classKeys } },
              { new: true, runValidators: true }
            );
            res
              .status(201)
              .json({ STATUS: "success", message: "Class Created" });
          } catch (error) {
            await classModel.deleteOne({
              _id: classInfo._id,
            });
            await staffInfoModel.update(
              { classId: classInfo._id },
              { $set: { classId: "" } },
              { new: true }
            );
            res.status(400).json({
              STATUS: "failed",
              message:
                "Error in assigning advisors or class to department, So class not created",
            });
          }
        } catch (err) {
          res.status(400).json(
            handleError(
              err,
              {
                STATUS: "failed",
                className: "",
                aliasName: "",
                section: "",
                advisorKeys: "",
                classGroupMailId: "",
                currentSemester: "",
                graduationYear: "",
                regulation: "",
                deptId: "",
              },
              "classes"
            )
          );
        }
      } else {
        res.status(400).json({
          STATUS: "failed",
          message: "Advisors not found or assigned with other classes",
        });
      }
    } else {
      res.status(400).json({
        STATUS: "failed",
        message: "Dept not found",
      });
    }
  } catch (deptError) {
    res
      .status(400)
      .json({ STATUS: "failed", message: "Error in finding dept" });
  }
};
