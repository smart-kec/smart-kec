module.exports = (req, res) => {
  res
    .status(201)
    .json({ status: "success", message: "Student created successfully" });
};