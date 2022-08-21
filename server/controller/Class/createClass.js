module.exports = async (req, res) => {
  const { dept, sec, Gyear } = req.body;
  const name = dept + "-" + sec + "-" + Gyear;
  res.send(name);
};
