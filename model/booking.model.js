'use strict'
const {sequelize,Sequelize} = require("../config/db")
const {DataTypes} = Sequelize;
const Booking = sequelize.define("booking", {
        to: {
            type: DataTypes.DATE,
            allowNull: true
        },
        from: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'booking',
        //paranoid: true
    }
);

module.exports = Booking;