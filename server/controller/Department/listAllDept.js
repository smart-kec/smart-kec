const deptModel = require("../../model/InfoCollections/departmentInfo");
module.exports.allDepts = async (req, res) => {
  try {
    const dept = await deptModel.find();
    res.status(201).json({
      status: "success",
      data: dept,
    });
  } catch (err) {
    res.status(400).json({
      staus: "failed",
      message: "Error in fetching departments",
    });
  }
};
