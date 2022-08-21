const homeDataModel = require("../../model/Home/homeDataModel");

module.exports = async (req, res) => {
  const {
    homeId,
    homeLightBackGround,
    homeLightText,
    homeLightTextDesc,
    homePageTopLine,
    homePageHeadLine,
    homePageDescription,
    homeButtonLabel,
    homeImgStart,
    homeImage,
    homeImageAlt,
    homeDark,
    homePrimary,
    homeDarkText,
  } = req.body;

  try {
    await homeDataModel.create({
      id: homeId,
      lightBg: homeLightBackGround,
      lightText: homeLightText,
      lightTextDesc: homeLightTextDesc,
      topLine: homePageTopLine,
      headLine: homePageHeadLine,
      description: homePageDescription,
      buttonLabel: homeButtonLabel,
      imgStart: homeImgStart,
      img: homeImage,
      alt: homeImageAlt,
      dark: homeDark,
      primary: homePrimary,
      darkText: homeDarkText,
    });
    res.status(201).json({
      status: "success",
      message: "Success data inserted",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Failed to insert the basic details into the db",
    });
  }
};
