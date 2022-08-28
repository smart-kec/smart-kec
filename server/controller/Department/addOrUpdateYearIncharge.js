const departmentModel = require("../../model/InfoCollections/departmentInfo");
const staffInfoModel = require("../../model/InfoCollections/staffInfoModel");

module.exports = async (req, res) => {
  const { deptId, studentYear, stdInchargeId } = req.body;
  try {
    const dept = await departmentModel.findOne(
      { _id: deptId },
      { _id: 1, yearIncharge: 1 }
    );
    console.log(dept);
    if (dept) {
      const yearInchargeCheck = await staffInfoModel.findOne(
        { _id: stdInchargeId },
        { _id: 1 }
      );
      if (yearInchargeCheck) {
        const yi = dept.yearIncharge;
        const datas = {
          year: studentYear,
          yearInchargeId: yearInchargeCheck._id,
        };
        const final = yi.filter((data) => {
          return data.year != studentYear;
        });
        final.push(datas);
        try {
          await departmentModel.updateOne(
            { _id: deptId },
            { $set: { yearIncharge: final } },
            { new: true, runValidators: true }
          );
          res
            .status(200)
            .json({ status: "success", message: "Updated successfully" });
        } catch (e) {
          res
            .status(400)
            .json({ status: "failed", message: "Invalid Year or Id" });
        }
      } else {
        res.status(400).json({
          status: "failed",
          message: "Invalid Year Incharge Id",
        });
      }
    } else {
      res
        .status(400)
        .json({ status: "failed", message: "Department not found" });
    }
  } catch (err) {
    res
      .status(400)
      .json({ status: "failed", message: "Error in updating year incharge" });
  }
};
