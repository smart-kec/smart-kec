const classModel = require("../../model/classModel");
const staffInfoModel = require("../../model/InfoCollections/staffInfoModel");

module.exports = async (req, res) => {
  const { classId, advisorId } = req.body;
  try {
    await staffInfoModel.updateOne(
      {
        _id: advisorId,
      },
      {
        $set: { classId: "" },
      },
      {
        new: true,
        upsert: true,
      }
    );
    const classInfo = await classModel.findOne(
      {
        _id: classId,
      },
      {
        advisorKeys: 1,
      }
    );
    if (classInfo.advisorKeys.includes(advisorId)) {
      classInfo.advisorKeys.remove(advisorId);
      await classModel.updateOne(
        {
          _id: classId,
        },
        {
          advisorKeys: classInfo.advisorKeys,
        },
        {
          new: true,
          upsert: true,
        }
      );
      res.status(200).json({
        status: "success",
        message: "Advisor Removed successfully",
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "Advisor not Assigned to class",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Error in removing advisor",
    });
  }
};
