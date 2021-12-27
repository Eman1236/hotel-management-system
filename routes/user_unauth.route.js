var express = require('express');
var router = express.Router();
const controller = require("../controller/index");


router.post("/login",controller.User.login);

module.exports = router;