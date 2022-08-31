const classModel = require("../../model/classModel");
const departmentModel = require("../../model/InfoCollections/departmentInfo");
const staffInfoModel = require("../../model/InfoCollections/staffInfoModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
module.exports = async (req, res) => {
  const { classId } = req.body;
  try {
    const classInfo = await classModel.findOne(
      { _id: classId },
      { status: 1, advisorKeys: 1, pastAdvisorKeys: 1, deptId: 1 }
    );
    const deptInfo = await departmentModel.findOne(
      { _id: classInfo.deptId },
      { classKeys: 1, endedClassKeys: 1 }
    );
    const staffInfo = await staffInfoModel.find(
      { _id: { $in: classInfo.advisorKeys } },
      { classId: 1, pastClass: 1 }
    );
    console.log(classInfo);
    console.log(deptInfo);
    console.log(staffInfo);
    if (classInfo && deptInfo && staffInfo.length > 0) {
      if (classInfo.status == "ongoing") {
        console.log("Ongoing");
        await staffInfo.map(async (a) => {
          a.pastClass.push(ObjectId(a.classId));
          a.classId = null;
          try {
            await staffInfoModel.updateOne(
              { _id: a._id },
              { pastClass: a.pastClass, classId: a.classId },
              { new: true }
            );
            console.log("Staff model updated");
          } catch (err) {
            res
              .status(400)
              .json({ STATUS: "failed", message: "Error in ending class" });
          }
        });
        deptInfo.endedClassKeys.push(ObjectId(classId));
        deptInfo.classKeys.remove(classId);
        classInfo.advisorKeys.map((a) => {
          classInfo.pastAdvisorKeys.push(ObjectId(a));
        });
        classInfo.advisorKeys = [];
        classInfo.status = "ended";
        console.log("Updation Complete");

        await departmentModel.updateOne(
          { _id: classInfo.deptId },
          {
            endedClassKeys: deptInfo.endedClassKeys,
            classKeys: deptInfo.classKeys,
          },
          { new: true }
        );
        console.log("dept model updated");

        await classModel.updateOne(
          { _id: classId },
          {
            advisorKeys: classInfo.advisorKeys,
            pastAdvisorKeys: classInfo.pastAdvisorKeys,
            status: classInfo.status,
          },
          { new: true }
        );
        console.log("class model updated");

        res
          .status(200)
          .json({ STATUS: "success", message: "Class Ended successfully" });
      } else {
        res.status(400).json({
          STATUS: "failed",
          message: "class already ended",
        });
      }
    } else {
      res.status(400).json({
        STATUS: "failed",
        message: "class or department or advisor not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      STATUS: "failed",
      message: "Error in Ending class",
    });
  }
};
