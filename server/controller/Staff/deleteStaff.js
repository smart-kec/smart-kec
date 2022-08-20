const accountModel = require("../../model/accountsModel");
const staffInfoModel = require("../../model/InfoCollections/staffInfoModel");

module.exports = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await staffInfoModel.findOne(
      { _id: userId },
      { email: 1, _id: 0 }
    );
    if (user) {
      await staffInfoModel.deleteOne({ _id: userId });
      await accountModel.deleteOne({ email: user.email, type: "Staff" });
      res.status(200).json({
        status: "success",
        message: "Staff deleted successfully",
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "Staff Id not found",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Error in deleting staff details",
    });
  }
};
