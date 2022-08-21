const classModel = require("../../model/classModel");
const staffInfoModel = require("../../model/InfoCollections/staffInfoModel");

module.exports = async (req, res) => {
  const { advisorId, classId } = req.body;
  try {
    const classInfo = await classModel.findOne(
      { _id: classId },
      { advisorKeys: 1 }
    );

    classInfo.advisorKeys.push(advisorId);

    await classModel.updateOne(
      {
        _id: classId,
      },
      {
        $set: { advisorKeys: classInfo.advisorKeys },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );
    try {
      await staffInfoModel.updateOne(
        {
          _id: advisorId,
        },
        {
          $set: { classId: classId },
        },
        { new: true, upsert: true, runValidators: true }
      );
      res.status(200).json({
        status: "success",
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
          upsert: true,
          runValidators: true,
        }
      );
      res.status(400).json({
        status: "failed",
        message: "Error in updating class to the advisor",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Error in updating advisor to the class",
    });
  }
};
