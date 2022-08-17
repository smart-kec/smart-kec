const departmentModel = require("../../model/InfoCollections/departmentInfo");

module.exports = async (req, res) => {
  const { deptEmail, studentYear, studentInchargeEmail } = req.body;
  try {
    const dept = await departmentModel.findOne({ deptEmail });
    if (dept) {
      const yi = dept.yearIncharge;
      const datas = {
        year: studentYear,
        yearInchargeEmail: studentInchargeEmail,
      };
      const final = yi.filter((data) => {
        return data.year != studentYear;
      });
      final.push(datas);
      try {
        await departmentModel.updateOne(
          { deptEmail },
          { $set: { yearIncharge: final } },
          { new: true, upsert: true, runValidators: true }
        );
        res
          .status(200)
          .json({ status: "success", message: "Updated successfully" });
      } catch (e) {
        res
          .status(400)
          .json({ status: "failed", message: "Invalid Year or Email" });
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
