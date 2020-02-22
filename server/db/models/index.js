const User = require("./user");
const Stock = require("./stock");
const UserStocks = require("./userStock");

User.belongsToMany(Stock, { through: UserStocks });
Stock.belongsToMany(User, { through: UserStocks });

module.exports = {
  User,
  Stock
};
