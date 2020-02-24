const User = require("./user");
const Stock = require("./stock");
const Transaction = require("./transaction");
const Portfolio = require("./portfolio");

Transaction.belongsTo(User);
User.hasMany(Transaction);

Stock.belongsTo(User);
User.hasMany(Stock);

Stock.belongsTo(Transaction);
Transaction.hasMany(Stock);

User.hasMany(Portfolio);
Portfolio.belongsTo(User);

// use userId to get transactionIds
// use transactionIds to get stockIds
// said stocks will return price, time, ticker, name
// to get total price & quantity of stocks for transaction, that's front-end data entered to transaction table

module.exports = {
  User,
  Stock,
  Transaction,
  Portfolio
};
