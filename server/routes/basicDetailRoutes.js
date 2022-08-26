const { Router } = require("express");
const beforeAuthorization = require("../controller/AuthController/beforeAuthorization");
const router = Router();

//Controllers
const homeDataInsertController = require("../controller/Home/insertDetails");

router.route("/*").get(beforeAuthorization);

router.route("/home/getData");

module.exports = router;
