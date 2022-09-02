const classModel = require("../../model/classModel");
const staffInfoModel = require("../../model/InfoCollections/staffInfoModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports = async (req, res) => {
  const { classId, advisorId } = req.body;

  try {
    const staff = await staffInfoModel.findOne(
      { _id: advisorId },
      { _id: 1, pastClass: 1, classId: 1 }
    );
    const classInfo = await classModel.findOne(
      { _id: classId },
      { advisorKeys: 1, pastAdvisorKeys: 1, status: 1 }
    );
    if (staff && classInfo && classInfo.status == "ongoing") {
      if (
        staff.pastClass.includes(classId) &&
        classInfo.pastAdvisorKeys.includes(advisorId)
      ) {
        res.status(400).json({
          STATUS: "warning",
          message: "Advisor already ended to class",
        });
      } else {
        if (
          staff.classId == classId &&
          classInfo.advisorKeys.includes(advisorId)
        ) {
          staff.pastClass.push(ObjectId(classId));
          await staffInfoModel.updateOne(
            { _id: advisorId },
            { $set: { classId: null, pastClass: staff.pastClass } },
            { new: true, upsert: true }
          );

          classInfo.advisorKeys.remove(advisorId);
          classInfo.pastAdvisorKeys.push(ObjectId(advisorId));
          await classModel.updateOne(
            { _id: classId },
            {
              $set: {
                advisorKeys: classInfo.advisorKeys,
                pastAdvisorKeys: classInfo.pastAdvisorKeys,
              },
            },
            {
              new: true,
              upsert: true,
            }
          );
          res.status(200).json({
            STATUS: "success",
            message: "Advisor Work Ended successfully",
          });
        } else {
          res.status(400).json({
            STATUS: "failed",
            message: "Advisor is not assigned to class",
          });
        }
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
          message: "Advisor or Class not found",
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      STATUS: "failed",
      message: "Error in removing advisos",
    });
  }
};
