var express = require('express');
var router = express.Router();

var unauthRouter = require("./user_unauth.route");
var hotelRouter = require("./hotel.route")
const passport = require('../config/passport.js');
router.use(passport.initialize());

router.use("/user",unauthRouter);
router.use("/hotel",passport.authenticate('jwt', { session: false }),hotelRouter);


module.exports = router;
