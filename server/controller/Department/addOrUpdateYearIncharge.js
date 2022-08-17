const departmentModel = require("../../model/InfoCollections/departmentInfo");

module.exports = async (req, res) => {
  const { email, year, yearInchargeEmail } = req.body;
  try {
    const dept = await departmentModel.findOne({ email });
    if (dept) {
      const yi = dept.yearIncharge;
      const datas = { year: year, yearInchargeEmail: yearInchargeEmail };
      const final = yi.filter((data) => {
        return data.year != year;
      });
      final.push(datas);
      try {
        await departmentModel.updateOne(
          { email },
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
