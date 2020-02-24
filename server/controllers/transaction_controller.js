// api call functions here

const { Stock, User, Transaction, Portfolio } = require("../db/models");

exports.getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll();
    // console.log(transactions);
    res.json(transactions);
  } catch (err) {
    next(err);
  }
};

exports.getUserTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      where: { userId: req.params.userId },
      attributes: ["id", "totalPrice", "quantity", "createdAt"]
    });
    const stocks = await Stock.findAll({
      where: { userId: req.params.userId }
    });
    const combined = stocks.map(stock => {
      for (let i = 0; i < transactions.length; i++) {
        let item = transactions[i];
        if (item.id === stock.transactionId) {
          return {
            transactionId: item.id,
            stockId: stock.id,
            quantity: item.quantity,
            totalPrice: item.totalPrice,
            price: stock.price,
            date: item.createdAt
          };
        }
      }
    });
    // console.log(transactions);
    res.json(combined);
  } catch (err) {
    next(err);
  }
};
