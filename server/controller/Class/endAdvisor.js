module.exports = async (req, res) => {
  const { classId, advisorId } = req.body;

  try {
    //TODO NEed to update past advisor lists in class and faculty both
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
