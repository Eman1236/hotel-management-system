const Service = require('../services/index')
const Joi = require('joi');

function timer(ms)
{
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
}

exports.getAllRooms = async (req,res) => {
    try {
        const searchBooking = new Service.Booking()
        await timer(1000);
        let Rooms = searchBooking.getAllRooms();
        res.send({"Rooms": Rooms});
    }
    catch (error) {
        res.send({"Error": error.message})
    }
}

const searchSchema = Joi.object({
    to: Joi.date(),
    from: Joi.date(),
    type: Joi.string().required()

})

exports.searchRoom = async (req,res) => {
    try {
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }

        const resp = await searchSchema.validateAsync(req.body);
        const searchBooking = new Service.Booking()
        await timer(1000);
        let freeRooms = searchBooking.getFreeRooms(resp.type);
        res.send({"Rooms": freeRooms});
    }
    catch (error) {
        res.send({"Error": error.message})
    }
}

const checkInSchema = Joi.object({
    roomId: Joi.number().required(),
    to: Joi.date(),
    name: Joi.string().required(),
    cnic: Joi.number().required(),
    phone_no: Joi.number().required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()

})


exports.checkIn = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }

        const resp = await checkInSchema.validateAsync(req.body);
        const booking = new Service.Booking()
        
        await timer(1000);
    
        var status = await booking.checkIn(resp.roomId,resp.name,resp.cnic,resp.email,resp.phone_no,resp.to);
        if(status)
        {
            res.send({"CheckIn_Details": status});
        }
    }
    catch (error) {
        res.send({"Error": error.message})
    }
};

const checkOutSchema = Joi.object({
    roomId: Joi.number().required()
})

exports.getUserDetail = async(req,res) => {
    try {
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }

        const resp = await checkOutSchema.validateAsync(req.body);
        const booking = new Service.Booking()
        await timer(1000);
    
        var user = await booking.getUserDetail(resp.roomId);
        if(user)
        {
            res.send({"User": user});
        }
    }
    catch (error) {
        res.send({"Error": error.message})
    }
}

exports.checkOut = async(req,res) => {
    try {
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }

        const resp = await checkOutSchema.validateAsync(req.body);
        const booking = new Service.Booking();

        await timer(1000);

        const checkOut = await booking.checkOut(resp.roomId);
        res.send({"CheckOut":checkOut});
    }
    catch (error) {
        res.send({"Error": error.message})
    }
};

exports.showOrders = async(req,res) => {
    try {
        const Order = new Service.OrderFood();
        const orders = await Order.showOrders();
        res.send({"Orders":orders});
    }
    catch (error) {
        res.send({"Error": error.message})
    }
};

const deleteOrderSchema = Joi.object({
    orderId: Joi.number().required()
});

exports.deleteOrder = async(req,res) => {
    try {
        const resp = await deleteOrderSchema.validateAsync(req.body);
        const Order = new Service.OrderFood();
        const delOrder = await Order.deleteOrder(resp.orderId);
        //console.log("Order Id:",req.body.orderId);
        if(delOrder > 0){
            res.send({"Status":"Successful"});
        }
    }
    catch (error) {
        res.send({"Error": error.message})
    }
}

exports.confirmOrder = async(req,res) => {
    try {
        const resp = await deleteOrderSchema.validateAsync(req.body);
        const Order = new Service.OrderFood();
        const confirmOrder = await Order.confirmOrder(resp.orderId);
        res.send({"Status":confirmOrder});
    }
    catch (error) {
        res.send({"Error": error.message})
    }
}

const orderFoodSchema = Joi.object({
    roomId: Joi.number().required(),
    items: Joi.array().items(
        Joi.object().keys({
            Item: Joi.string().required(),
            quantity: Joi.number().required()
      }).required())
      .required()
})

exports.orderFood = async(req,res) => {
    try {
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }
        console.log(req.body);
        const resp = await orderFoodSchema.validateAsync(req.body);
        const Order = new Service.OrderFood();
        const orderStatus = await Order.placeOrder(resp.roomId,resp.items);
        if(orderStatus){
            console.log(orderStatus);
            res.send({"Order_Credentials:": orderStatus});
        }
    }
    catch (error) {
        res.send({"Error": error.message})
    }
};