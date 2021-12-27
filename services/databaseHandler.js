const Model = require("../model/index");
const user = require("../model/user.model");
const validItems = require('./Items.json')
const Handler = class {
    constructor() {

    }

    initialize = async () => {
        let allRooms = await Model.Room.findAll({
            attributes: ['id', 'type', 'floor'],
            include: [
                {
                    model: await Model.Booking,

                }
            ]

        })
        return allRooms
    }

    saveGuestDetails = async (Name, Cnic, Email, Phone, Password) => {
        try {
            const User = {
                name: Name,
                email: Email,
                password: Password,
                phone_no: Phone,
                cnic: Cnic,
                role: "Guest"
            }

            const guest = await Model.User.create(User);
            // console.log(guest);
            if (guest) {
                // console.log("Guest Id:",guest.dataValues.id);
                return guest.dataValues.id;
            }
        }
        catch (error) {
            return error.message;
        }
    }

    saveBookingDetails = async (to, roomId, guestId) => {
        try {
            const Details = {
                to: to,
                from: new Date(),
                roomId: roomId,
                userId: guestId
            }
            const result = await Model.Booking.create(Details);
            if (result)
                return result.dataValues;
        }
        catch (error) {
            return error.message;
        }

    }

    placeOrder = async (roomId, items) => {
        try {
            //console.log(roomId,items);
            const result = await Model.sequelize.transaction(async (t) => {
                const order = await Model.OrderQueue.create({
                   roomId: roomId
                }, { transaction: t });

                var orderId = order.dataValues.id;
                let newItems = []
                for(var item of items)
                {
                    let obj = {
                        "orderQueueId": orderId,
                        "Item": item.Item,
                        "quantity": item.quantity
                    }
                    newItems.push(obj);
                }
                const orderItems = await Model.OrderItem.bulkCreate(newItems,{ transaction: t});
                //console.log("order in db:",order);
                return order.dataValues;

            });

            return result;

        } catch (error) {
            return error.message;
        }
    }

    showOrders = async() => {
        var allOrders = await Model.OrderQueue.findAll({
            attributes: ['id', 'createdAt', 'roomId'],
            include: [
                {
                    model: await Model.OrderItem,
                    attributes: ['Item','quantity']

                }
            ]
        })
        return allOrders;
    }

    deleteOrder = async(orderId) => {
        try {
            const result = await Model.sequelize.transaction(async (t) => {
                const orderItems = await Model.OrderItem.destroy({ where: { orderQueueId: orderId }},{ transaction: t});
                const order = await Model.OrderQueue.destroy({
                   where: {
                   id: orderId
                   }
                }, { transaction: t });

                return order;

            });

            return result;

        } catch (error) {
            return error.message;
        }
    }

    confirmOrder = async(order,total_bill) => {
        try {
            const result = await Model.sequelize.transaction(async (t) => {
               
                const delItems = await Model.OrderItem.destroy({where: {orderQueueId: order.id}},{transaction: t});
                const delOrder = await Model.OrderQueue.destroy({where: {id: order.id}},{transaction: t});
                const addOrder = await Model.FoodOrder.create({
                    id: order.id,
                    total_bill: total_bill,
                    roomId: order.roomId
                },{transaction: t});

                var orderId = addOrder.dataValues.id;
                let newItems = []
                for(var item of order.OrderItems)
                {
                    let obj = {
                        "foodOrderId": orderId,
                        "Item": item.dataValues.Item,
                        "quantity": item.dataValues.quantity
                    }
                    newItems.push(obj);
                }
                const addItems = await Model.FoodOrderItem.bulkCreate(newItems,{ transaction: t});
                return orderId;

            });

            return result;

        } catch (error) {
            return error.message;
        }
    }

    getFoodOrders = async(roomId) => {
        try {
            const orders = await Model.FoodOrder.findAll({where: {roomId: roomId}});
            let foodOrders = []
            for (const order of orders) {
                foodOrders.push(order.dataValues);
            }
            return foodOrders;
        }
        catch(error){
            return error.message;
        }
    }

    checkOut = async(roomId,userId) => {
        try {
            const result = await Model.sequelize.transaction(async (t) => {
                const foodOrders = await Model.FoodOrder.destroy({where: {roomId: roomId}},{transaction: t});
                const queueOrders = await Model.OrderQueue.destroy({where: {roomId: roomId}},{transaction: t});
                const booking = await Model.Booking.destroy({where: {roomId: roomId}},{transaction: t});
                const user = await Model.User.destroy({where: {id: userId}},{transaction: t});

                return user;
            });

            return result;

        } catch (error) {
            return error.message;
        }
    }

    getUserDetail = async(userId) => {
        const user = await Model.User.findOne({where: {id: userId}});
        if(user)
            return user.dataValues;
        else
            return false;
    } 
};

module.exports = Handler;