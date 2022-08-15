const { Router } = require("express");
const router = Router();

//Controllers
const homeDataInsertController = require("../controller/Home/insertDetails");

router.route("/*").get(authorizationController.beforeAuthorization);

router.route("/home/getData");

module.exports = router;
