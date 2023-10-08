const dbConfig = require("../config/dbconfig");
const { Sequelize, DataTypes } = require("sequelize");

//la sequelize yo data haru lag ani database sanga connect garna khoj
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port : dbConfig.PORT,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("CONNECTED!!");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// REQUIRE ALL MODELS HERE
db.blogs = require("./blogModel.js")(sequelize,DataTypes)



db.sequelize.sync({ force:false }).then(() => {
  console.log("yes re-sync done");
});

module.exports = db;