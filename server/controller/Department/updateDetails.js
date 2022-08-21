const departmentModel = require("../../model/InfoCollections/departmentInfo");
const handleError = require("../HandleError/updateHandler");
module.exports = async (req, res) => {
  const { _id, semesterCount, yearStarted } = req.body;
  try {
    await departmentModel.updateOne(
      {
        _id,
      },
      { noOfSemesters: semesterCount, establishedYear: yearStarted },
      { new: true, upsert: true, runValidators: true }
    );
    res
      .status(200)
      .json({ status: "success", message: "Updated successfully" });
  } catch (err) {
    const errors = handleError(err, {
      status: "failed",
      noOfSemesters: "",
      establishedYear: "",
    });

    res.status(400).json(errors);
  }
};
