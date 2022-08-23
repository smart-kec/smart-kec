const departmentModel = require("../../model/InfoCollections/departmentInfo");
const staffInfoModel = require("../../model/InfoCollections/staffInfoModel");

module.exports = async (req, res) => {
  const { deptEmail, studentYear, studentInchargeEmail } = req.body;
  try {
    const dept = await departmentModel.findOne({ deptEmail });

    if (dept) {
      const yearInchargeCheck = await staffInfoModel.findOne(
        { email: studentInchargeEmail },
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
            { email: deptEmail },
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
