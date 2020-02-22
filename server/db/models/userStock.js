const Sequelize = require("sequelize");
const db = require("../db");

const UserStocks = db.define("UserStocks", {
  name: {
    type: Sequelize.STRING,
    defaultValue: "stock name here"
  }
});

module.exports = UserStocks;
