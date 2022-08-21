const deptModel = require("../../model/InfoCollections/departmentInfo");
module.exports = async (req, res) => {
  try {
    const dept = await deptModel.find(
      {},
      {
        fullName: 1,
        aliasName: 1,
        email: 1,
        noOfSemesters: 1,
        courseDuration: 1,
        programme: 1,
        _id: 1,
      }
    );
    res.status(200).json({
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
