const User = require("./user");
const Stock = require("./stock");
const Transaction = require("./transaction");

// Stock.belongsToMany(User, {
//   through: "transaction",
//   as: "users",
//   foreignKey: "stockId",
//   primaryKey: "userId"
// });
// User.belongsToMany(Stock, {
//   through: "transaction",
//   as: "stocks",
//   foreignKey: "userId",
//   primaryKey: "stockId"
// });

Transaction.belongsTo(User);
User.hasMany(Transaction);

Stock.belongsTo(User);
User.hasMany(Stock);

Stock.belongsTo(Transaction);
Transaction.hasMany(Stock);

// use userId to get transactionIds
// use transactionIds to get stockIds
// said stocks will return price, time, ticker, name
// to get total price & quantity of stocks for transaction, that's front-end data entered to transaction table

module.exports = {
  User,
  Stock,
  Transaction
};
