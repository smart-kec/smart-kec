const classModel = require("../../model/classModel");
const staffInfoModel = require("../../model/InfoCollections/staffInfoModel");

module.exports = async (req, res) => {
  const { classId } = req.body;
  try {
    const classInfo = await classModel.findOne(
      { _id: classId },
      { advisorKeys: 1, pastAdvisorKeys: 1 }
    );
    if (classInfo) {
      const advisorInfo = await staffInfoModel.find(
        { _id: { $in: classInfo.advisorKeys } },
        { name: 1, designation: 1, gender: 1, phoneNumber: 1 }
      );
      const pastAdvisorInfo = await staffInfoModel.find(
        { _id: { $in: classInfo.pastAdvisorKeys } },
        { name: 1, designation: 1, gender: 1, phoneNumber: 1 }
      );
      res.status(200).json({
        STATUS: "success",
        advisorInfo: advisorInfo,
        pastAdvisorInfo: pastAdvisorInfo,
      });
    } else {
      res.status(400).json({ STATUS: "failed", message: "class not found" });
    }
  } catch (err) {
    res
      .status(400)
      .json({ STATUS: "failed", message: "Error in listing Advisors" });
  }
};
