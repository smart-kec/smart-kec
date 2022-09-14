const classModel = require("../../model/classModel");
const studentInfoModel = require("../../model/InfoCollections/studentInfoModel");

module.exports = async (req, res) => {
  const { classId, type } = req.body;
  try {
    const stdKeys = await classModel.findOne(
      { _id: classId },
      { studentsKeys: 1 }
    );
    const gender = type.toLowerCase();
    var result = { STATUS: "success" };
    if (type == "all") {
      const stdList = await studentInfoModel
        .find(
          { _id: { $in: stdKeys.studentsKeys } },
          { name: 1, rollNo: 1, gender: 1, phoneNumber: 1 }
        )
        .sort({ rollNo: 1 });
      result.data = stdList;
      res.status(200).json(result);
    } else if (gender == "male" || gender == "female") {
      const stdList = await studentInfoModel
        .find(
          {
            _id: { $in: stdKeys.studentsKeys },
            gender: { $regex: "^" + type + "$", $options: "i" },
          },
          { name: 1, rollNo: 1, phoneNumber: 1 }
        )
        .sort({ rollNo: 1 });
      result.data = stdList;
      res.status(200).json(result);
    } else {
      result.STATUS = "failed";
      result.message = "Invalid request";
      res.status(400).json(result);
    }
  } catch (error) {
    res
      .status(400)
      .json({ STATUS: "failed", message: "Error in finding students" });
  }
};