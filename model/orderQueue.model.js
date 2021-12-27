'use strict'
const {sequelize,Sequelize} = require("../config/db")
const {DataTypes} = Sequelize;
const OrderQueue = sequelize.define("orderQueue", {
        
    }, {
        tableName: 'orderQueue',
    }
);

module.exports = OrderQueue;