const classModel = require("../../model/classModel");
const staffInfoModel = require("../../model/InfoCollections/staffInfoModel");

module.exports = async (req, res) => {
  const { classId, advisorId } = req.body;
  //FIX NEed to check - Sending success message event though advisor is not assigned
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
    classInfo.advisorKeys.pop(advisorId);

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
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Error in removing advisos",
    });
  }
};
