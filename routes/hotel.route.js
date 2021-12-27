'use strict'

var express = require('express');
var router = express.Router();

var controller = require('../controller/index') 


router.post("/checkIn",controller.Hotel.checkIn);
router.post("/checkOut",controller.Hotel.checkOut);
router.post("/orderFood",controller.Hotel.orderFood);
router.post("/searchRoom",controller.Hotel.searchRoom);
router.get("/showOrders",controller.Hotel.showOrders);
router.post("/deleteOrder",controller.Hotel.deleteOrder);
router.post("/confirmOrder",controller.Hotel.confirmOrder);
router.get("/",controller.Hotel.getAllRooms);
router.post("/getUser",controller.Hotel.getUserDetail);


module.exports = router;
