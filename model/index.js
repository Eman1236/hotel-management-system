const User = require("./user.model");
const Booking = require("./booking.model")
const Room = require("./room.model")
const OrderQueue = require("./orderQueue.model")
const OrderItem = require("./orderItems.model")
const FoodOrder = require("./foodOrder.model")
const FoodOrderItem = require("./foodOrderItem.model")
const {sequelize} = require("../config/db")

const Model = {
    User,
    Booking,
    Room,
    OrderQueue,
    OrderItem,
    FoodOrder,
    FoodOrderItem,
    sequelize
}

User.hasMany(Booking,{
  foreignKey: {
      name: 'userId',
      allowedNull: false
  }
});
Booking.belongsTo(User);

Room.hasOne(Booking,{
  foreignKey: {
      name: 'roomId',
      allowedNull: false
  }
});
Booking.belongsTo(Room);

OrderQueue.hasMany(OrderItem,{
    foreignKey: {
        name: 'orderQueueId',
        allowedNull: false
    }
});
OrderItem.belongsTo(OrderQueue);

Room.hasMany(OrderQueue,{
    foreignKey: {
        name: 'roomId',
        allowedNull: false
    }
});
OrderQueue.belongsTo(Room);

Room.hasMany(FoodOrder,{
    foreignKey: {
        name: 'roomId',
        allowedNull: false
    }
});
FoodOrder.belongsTo(Room);

FoodOrder.hasMany(FoodOrderItem,{
    foreignKey: {
        name: 'foodOrderId',
        allowedNull: false
    }
});
FoodOrderItem.belongsTo(FoodOrder);

let users = [
  {
      name: "Zain",
      cnic: 6722826272832,
      phone_no: 03215162527,
      role: "Receptionist",
      email: "zain@gmail.com",
      password: "zain"
  },
  {
      name: "Eman",
      cnic: 6722826272833,
      phone_no: 03215162522,
      role: "Chef",
      email: "eman@gmail.com",
      password: "eman"
  },
];

let rooms = [
    {
        type:"Single Deluxe",
        floor: "First"
    },
    {
        type:"Single Deluxe",
        floor: "Second"
    },
    {
        type:"Single Deluxe",
        floor: "Third"
    },
    {
        type:"Single Deluxe",
        floor: "Fourth"
    },
  
    {
        type:"Double Deluxe",
        floor: "First"
    },
    {
        type:"Double Deluxe",
        floor: "Second"
    },
    {
        type:"Double Deluxe",
        floor: "Third"
    },
    {
        type:"Double Deluxe",
        floor: "Fourth"
    },
  
    {
        type:"Single Executive",
        floor: "First"
    },
    {
        type:"Single Executive",
        floor: "Second"
    },
    {
        type:"Single Executive",
        floor: "Third"
    },
    {
        type:"Single Executive",
        floor: "Fourth"
    },
  
    {
        type:"Double Executive",
        floor: "First"
    },
    {
        type:"Double Executive",
        floor: "Second"
    },
    {
        type:"Double Executive",
        floor: "Third"
    },
    {
        type:"Double Executive",
        floor: "Fourth"
    },
];
  
// sequelize.sync({ force: false }).then(() => {
//   User.bulkCreate(users).then(() => {
//       console.log('users created');
//   }).catch((err) => {
//       console.log('failed to create users');
//       console.log(err);
//   });
//   Room.bulkCreate(rooms).then(() => {
//     console.log('rooms created');
//   }).catch((err) => {
//     console.log('failed to create rooms');
//     console.log(err);
//     });
// });



module.exports = Model;