const staffInfoModel = require("../../model/InfoCollections/staffInfoModel");

module.exports = async (req, res) => {
  const { deptKey } = req.body;
  try {
    const advisorList = await staffInfoModel.find(
      {
        deptId: deptKey,
        classId: null,
      },
      {
        _id: 1,
        name: 1,
        designation: 1,
      }
    );
    res.status(200).json({
      STATUS: "success",
      data: advisorList,
    });
  } catch (err) {
    res.status(400).json({
      STATUS: "failed",
      message: "Error in generating list",
    });
  }
};
