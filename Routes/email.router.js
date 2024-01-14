const express = require('express');
const router = express.Router();

const {emailController} = require('../Controllers/controllers')

router.route("/send").post(emailController)

module.exports = router