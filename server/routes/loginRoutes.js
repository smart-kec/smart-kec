const express = require('express');

const loginController = require('./../controller/loginController');

const router = express.Router();

router 
    .route('/')
    .post(loginController.loginAuthentication)

router
    .route('/forgotPassword')
    .post(loginController.forgotPassword)


module.exports = router;