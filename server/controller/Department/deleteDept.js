const accountModel = require("../../model/accountsModel");
const deptModel = require("../../model/InfoCollections/departmentInfo");

module.exports = async (req, res) => {
  const { userId } = req.body;
  try {
    const dept = await deptModel.findOne(
      {
        _id: userId,
      },
      { email: 1, _id: 0, classKeys: 1 }
    );

    if (dept) {
      if (dept.classKeys.length) {
        res.status(400).json({
          status: "failed",
          message:
            "Some classes are assigned to the Dept. Ensure first to delete the class",
        });
      } else {
        await accountModel.deleteOne({
          email: dept.email,
          type: "Department",
        });
        await deptModel.deleteOne({
          _id: userId,
        });
        res.status(200).json({
          status: "success",
          message: "Department deleted",
        });
      }
    } else {
      res.status(400).json({
        status: "failed",
        message: "Department not found",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Error in deleting department",
    });
  }
};
