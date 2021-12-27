'use strict'
const {sequelize,Sequelize} = require("../config/db")
const {DataTypes} = Sequelize;
const Room = sequelize.define("room", {
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        floor: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'room',
        paranoid: true
    }
);

module.exports = Room;