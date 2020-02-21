const User = require("./users");
const Stock = require("./stocks");

User.hasMany(Stock);
Stock.belongsToMany(User);

module.exports = {
  User,
  Stock
};
