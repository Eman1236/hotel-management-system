'use strict'
const {sequelize,Sequelize} = require("../config/db")
const {DataTypes} = Sequelize;
const FoodOrder = sequelize.define("foodOrder", {

        total_bill: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'foodOrder',
        //paranoid: true
    }
);


module.exports = FoodOrder;