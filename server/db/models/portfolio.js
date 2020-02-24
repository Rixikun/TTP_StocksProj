const Sequelize = require("sequelize");
const db = require("../db");

const Portfolio = db.define("portfolio", {
  totalPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  ticker: {
    type: Sequelize.STRING
  }
});

module.exports = Portfolio;

/* 3rd Join Table revisions

Transaction:
- Stock, User, Date, Quantity, Price

Portfolio:
- 1 User has 1 Portfolio (1to1)
- 1 portfolio has MANY Stock (1toMany)
- Stock, CurrPrice, Quantity

*/
