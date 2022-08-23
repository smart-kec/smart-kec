const classModel = require("../../model/classModel");
const handleError = require("../HandleError/handleError");
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
      const advisorsInfo = await staffInfoModel.find(
        { _id: { $in: advisors }, classId: "" },
        { _id: 1 }
      );

      if (advisorsInfo.length == advisors.length) {
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
              { new: true, runValidators: true }
            );
            deptInfo.classKeys.push(classInfo._id);
            await departmentModel.updateOne(
              { _id: deptId },
              { $set: { classKeys: deptInfo.classKeys } },
              { new: true, runValidators: true }
            );
            res
              .status(201)
              .json({ status: "success", message: "Class Created" });
          } catch (error) {
            await classModel.deleteOne({
              _id: classInfo._id,
            });
            await staffInfoModel.update(
              { classId: classInfo._id },
              { $set: { classId: "" } }
            );
            res.status(400).json({
              status: "failed",
              message:
                "Error in assigning advisors or class to department, So class not created",
            });
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
          message: "Advisors not found or assigned with other classes",
        });
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
