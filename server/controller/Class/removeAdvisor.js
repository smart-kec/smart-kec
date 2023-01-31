const classModel = require("../../model/classModel");
const staffInfoModel = require("../../model/InfoCollections/staffInfoModel");

module.exports = async (req, res) => {
  const { classId, advisorId } = req.body;
  try {
    const classInfo = await classModel.findOne(
      { _id: classId },
      { advisorKeys: 1 }
    );
    const staffInfo = await staffInfoModel.findOne(
      { _id: advisorId, classId: classId },
      { _id: 1 }
    );
    if (classInfo && classInfo.status == "ongoing" && staffInfo) {
      await staffInfoModel.updateOne(
        {
          _id: advisorId,
        },
        {
          $set: { classId: null },
        },
        {
          new: true,
          upsert: true,
        }
      );

      if (classInfo.advisorKeys.includes(advisorId)) {
        classInfo.advisorKeys.remove(advisorId);
        await classModel.updateOne(
          {
            _id: classId,
          },
          {
            $set: {
              advisorKeys: classInfo.advisorKeys,
            },
          },
          {
            new: true,
            upsert: true,
          }
        );
        res.status(200).json({
          STATUS: "success",
          message: "Advisor Removed successfully",
        });
      } else {
        res.status(400).json({
          STATUS: "failed",
          message: "Advisor not Assigned to class",
        });
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
          message: "Requested Advisor or Class not found",
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      STATUS: "failed",
      message: "Error in removing advisor",
    });
  }
};
