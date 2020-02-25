const Sequelize = require("sequelize");
const db = require("../db");

const Transaction = db.define("transaction", {
  totalPrice: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0
  },
  quantity: {
    type: Sequelize.INTEGER
  }
  // stockIds: {
  //   type: Sequelize.ARRAY(Sequelize.INTEGER)
  // }
});

module.exports = Transaction;

/* 3rd Join Table revisions

Transaction:
- Stock, User, Date, Quantity, Price

Portfolio:
- 1 User has 1 Portfolio (1to1)
- 1 portfolio has MANY Stock (1toMany)
- Stock, CurrPrice, Quantity

*/
