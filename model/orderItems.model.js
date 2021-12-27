'use strict'
const {sequelize,Sequelize} = require("../config/db")
const {DataTypes} = Sequelize;
const OrderItem = sequelize.define("OrderItem", {

        orderQueueId:{ 
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
        tableName: 'orderItem',
    }
);

module.exports = OrderItem;