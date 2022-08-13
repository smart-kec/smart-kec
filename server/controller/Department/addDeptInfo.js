const departmentModel = require("../../model/InfoCollections/departmentInfo");
const accountsModel = require("../../model/accountsModel");
const handleError = require("../HandleError/handleError");
module.exports.addDeptInfo = async (req, res) => {
  const {
    fullName,
    aliasName,
    email,
    noOfSemesters,
    establishedYear,
    hodEmail,
  } = req.body;

  try {
    await departmentModel.create({
      fullName,
      aliasName,
      email,
      noOfSemesters,
      establishedYear,
      hodEmail,
    });
    res.status(201).json({
      status: "success",
      message: "New department created... Login for more",
    });
  } catch (err) {
    var errors = handleError(
      err,
      {
        status: "failed",
        fullName: "",
        aliasName: "",
        email: "",
        noOfSemesters: "",
        establishedYear: "",
        hodEmail: "",
      },
      "departments"
    );
    try {
      await accountsModel.deleteOne({ email });
    } catch (er) {
      res.status(400).json({
        status: "failed",
        message:
          "Account model not deleted but constraints available in dept info",
      });
    }
    res.status(400).json(errors);
  }
};

module.exports.addYI = async (req, res) => {
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
