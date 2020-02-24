// api call functions here

const { Stock, User, Transaction } = require("../db/models");

exports.getStocks = async (req, res, next) => {
  try {
    const stocks = await Stock.findAll();
    res.json(stocks);
  } catch (err) {
    next(err);
  }
};
