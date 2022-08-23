const classModel = require("../../model/classModel");
const staffInfoModel = require("../../model/InfoCollections/staffInfoModel");

module.exports = async (req, res) => {
  const { advisorId, classId } = req.body;
  try {
    const classInfo = await classModel.findOne(
      { _id: classId },
      { advisorKeys: 1 }
    );
    const advisorInfo = await staffInfoModel.findOne(
      { _id: advisorId },
      { _id: 1 }
    );
    if (classInfo && advisorInfo) {
      if (classInfo.advisorKeys.includes(advisorId)) {
        res.status(400).json({
          status: "failed",
          message: "Advisor is already assigned",
        });
      } else {
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
              runValidators: true,
            }
          );
          res.status(400).json({
            status: "failed",
            message: "Error in updating class to the advisor",
          });
        }
      }
    } else {
      res.status(400).json({
        status: "failed",
        message: "Requested Class or Advisor not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: "Error in updating advisor to the class",
    });
  }
};
