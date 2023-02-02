const departmentModel = require("../../model/InfoCollections/departmentInfo");

module.exports = async (req, res) => {
  const deptId = req.body.deptID;
  console.log("Req Body", req.body);
  console.log("Dept ID : ", deptId);
  try {
    const dept = await departmentModel.findOne(
      { _id: deptId },
      { noOfSemesters: 1, courseDuration: 1, _id: 1 }
    );
    res.status(200).json({
      STATUS: "success",
      data: dept,
    });
  } catch (error) {
    res.STATUS(400).json({
      STATUS: "failed",
      message: "Error in listing department",
    });
  }
};
