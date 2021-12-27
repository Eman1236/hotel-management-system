'use strict'
const {sequelize,Sequelize} = require("../config/db")
const {DataTypes} = Sequelize;
const user = sequelize.define("user", {
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        cnic: {
            type: DataTypes.BIGINT(13),
            allowNull: false
        },
        phone_no: {
            type: DataTypes.BIGINT(11),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull : false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'user',
        //paranoid: true
    }
);

module.exports = user;