const Sequelize = require("sequelize");
const db = require("../db");

const Stock = db.define("stock", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.INTEGER
  }
});

module.exports = Stock;
