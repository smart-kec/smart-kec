const classModel = require("../../model/classModel");
const staffInfoModel = require("../../model/InfoCollections/staffInfoModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
module.exports = async (req, res) => {
  const { advisorId, classId } = req.body;
  try {
    const classInfo = await classModel.findOne(
      { _id: classId },
      { advisorKeys: 1, pastAdvisorKeys: 1, status: 1 }
    );
    const advisorInfo = await staffInfoModel.findOne(
      { _id: advisorId, classId: null },
      { _id: 1, pastClass: 1 }
    );
    if (classInfo && advisorInfo && classInfo.status == "ongoing") {
      if (
        classInfo.advisorKeys != null &&
        classInfo.advisorKeys.includes(advisorId)
      ) {
        res.status(400).json({
          STATUS: "failed",
          message: "Advisor is already assigned ",
        });
      } else {
        if (
          classInfo.pastAdvisorKeys != null &&
          classInfo.pastAdvisorKeys.includes(advisorId)
        ) {
          classInfo.pastAdvisorKeys.remove(advisorId);
        }

        if (
          advisorInfo.pastClass != null &&
          advisorInfo.pastClass.includes(classId)
        ) {
          advisorInfo.pastClass.remove(classId);
        }
        console.log("kk");

        classInfo.advisorKeys.push(ObjectId(advisorId));
        console.log("jj");

        await classModel.updateOne(
          { _id: classId },
          {
            $set: {
              advisorKeys: classInfo.advisorKeys,
              pastAdvisorKeys: classInfo.pastAdvisorKeys,
            },
          },
          { new: true, runValidators: true }
        );
        try {
          await staffInfoModel.updateOne(
            { _id: advisorId },
            {
              $set: {
                classId: ObjectId(classId),
                pastClass: advisorInfo.pastClass,
              },
            },
            { new: true, upsert: true, runValidators: true }
          );
          res.status(200).json({
            STATUS: "success",
            message: "New Advisor added to the class",
          });
        } catch (err) {
          classInfo.advisorKeys.remove(advisorId);
          await classModel.updateOne(
            {
              _id: classId,
            },
            {
              $set: { advisorKeys: classInfo.advisorKeys },
            },
            {
              new: true,
              runValidators: true,
            }
          );
          res.status(400).json({
            STATUS: "failed",
            message: "Error in updating class to the advisor",
          });
        }
      }
    } else {
      if (classInfo.status == "ended") {
        res.status(400).json({
          STATUS: "warning",
          message: "Class Ended",
        });
      } else {
        res.status(400).json({
          STATUS: "failed",
          message:
            "Requested Class or Advisor not found or advisor assigned to other class",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      STATUS: "failed",
      message: "Error in updating advisor to the class",
    });
  }
};
