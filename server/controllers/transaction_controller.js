// api call functions here

const { Stock, User, Transaction } = require("../db/models");

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
      where: { userId: req.body.userId },
      attributes: ["id", "totalPrice", "quantity", "createdAt"]
    });
    const stocks = await Stock.findAll({
      where: { userId: req.body.userId }
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

exports.postPurchase = async (req, res, next) => {
  try {
    const transaction = await Transaction.create({
      quantity: req.body.quantity,
      userId: req.body.userId
    });
    const stock = await Stock.create({
      ticker: req.body.ticker,
      transactionId: transaction.id,
      userId: transaction.userId,
      price: 50,
      open: 40
    });
    transaction.totalPrice = req.body.quantity * stock.price;
    transaction.save();
    // console.log(transaction);
    res.json(transaction);
  } catch (err) {
    next(err);
  }
};
