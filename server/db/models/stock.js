const Sequelize = require("sequelize");
const db = require("../db");

const Stock = db.define("stock", {
  ticker: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  name: {
    type: Sequelize.STRING
  },
  open: {
    type: Sequelize.DECIMAL
  },
  price: {
    type: Sequelize.DECIMAL(10, 4),

    defaultValue: 0
  },
  date: {
    type: Sequelize.DATE
  }
});

module.exports = Stock;
