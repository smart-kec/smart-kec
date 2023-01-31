const classModel = require("../../model/classModel");
const studentInfoModel = require("../../model/InfoCollections/studentInfoModel");

module.exports = async (req, res) => {
  const { classId } = req.body;
  try {
    const classInfo = await classModel.findOne(
      { _id: classId },
      { boysRep: 1, girlsRep: 1 }
    );
    const repInfo = await studentInfoModel
      .find(
        { _id: { $in: [classInfo.boysRep, classInfo.girlsRep] } },
        { name: 1, rollNo: 1, gender: 1, phoneNumber: 1 }
      )
      .sort({ gender: 1 });
    res.status(200).json({ STATUS: "success", data: repInfo });
  } catch (error) {
    res.status(400).json({ STATUS: "failed", message: "Error in listing rep" });
  }
};
