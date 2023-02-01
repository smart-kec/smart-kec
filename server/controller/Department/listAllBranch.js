const departmentModel = require("../../model/InfoCollections/departmentInfo");

module.exports = async (req, res) => {
  const program = req.body.programme;
  console.log("Req Body", req.body);
  console.log("Program : ", program);
  try {
    const dept = await departmentModel.find(
      { programme: program },
      { programme: 1, aliasName: 1, _id: 1 }
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
