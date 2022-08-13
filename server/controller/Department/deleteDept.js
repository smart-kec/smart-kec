const deptModel = require("../../model/InfoCollections/departmentInfo");

module.exports = async (req, res) => {
  const { userId } = req.body;
  try {
    await deptModel.deleteOne({
      _id: userId,
    });
    res.status(200).json({
      status: "success",
      message: "Department deleted",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Error in deleting department",
    });
  }
};
