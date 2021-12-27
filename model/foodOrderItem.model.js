const {sequelize,Sequelize} = require("../config/db")
const {DataTypes} = Sequelize;
const FoodOrderItem = sequelize.define("FoodOrderItem", {
        
    foodOrderId:{ 
        type : DataTypes.INTEGER,
        allowNull : false,
        primaryKey: true
    },
    Item:{ 
        type : DataTypes.STRING,
        allowNull : false,
        primaryKey : true
    },
    quantity:{ 
        type : DataTypes.INTEGER,
        allowNull : false
    }
}, {
    tableName: 'foodOrderItem',
    //paranoid: true
}
);

module.exports = FoodOrderItem;