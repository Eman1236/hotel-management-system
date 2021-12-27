const config = require('config');
const Sequelize = require("sequelize");

const dbConfig = config.get('Hotel.dbConfig');

console.log(dbConfig);

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
//   operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const a = (async() => {
    await sequelize.sync({
        // alter:true,
        // force: true
    });
})();

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// // db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

module.exports = db;