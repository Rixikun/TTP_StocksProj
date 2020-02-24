// api call functions here

const { Stock, User, Transaction, Portfolio } = require("../db/models");
const apikeyAV = require("../../apikey");
const fetch = require("node-fetch");

exports.getStocks = async (req, res, next) => {
  try {
    const stocks = await Stock.findAll();
    res.json(stocks);
  } catch (err) {
    next(err);
  }
};

exports.searchStock = async (req, res, next) => {
  try {
    const keywords = req.query.keywords;
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${apikeyAV}`;

    fetch(url)
      .then(response => response.json()) //<-- dont write 'res' thats taken
      .then(stock => res.json(stock.bestMatches));
  } catch (err) {
    next(err);
  }
};

exports.selectStock = async (req, res, next) => {
  try {
    const symbol = req.query.symbol;
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apikeyAV}`;

    fetch(url)
      .then(response => response.json())
      .then(stock => res.json(stock["Global Quote"]));
  } catch (err) {
    next(err);
  }
};

exports.postPurchase = async (req, res, next) => {
  try {
    //create transaction
    const transaction = await Transaction.create({
      quantity: req.body.quantity,
      userId: req.params.userId
    });
    //create stock
    const stock = await Stock.create({
      ticker: req.body.ticker,
      transactionId: transaction.id,
      userId: transaction.userId,
      price: 50,
      open: 40
    });
    //update transaction
    transaction.totalPrice = req.body.quantity * stock.price;
    transaction.save();

    //update portfolio
    let portfolio = await Portfolio.findOne({
      where: { userId: req.params.userId, ticker: req.body.ticker }
    });

    if (portfolio === null) {
      portfolio = await Portfolio.create({
        ticker: req.body.ticker,
        userId: req.params.userId
      });
    }

    Portfolio.update(
      {
        totalPrice: (portfolio.totalPrice += transaction.totalPrice),
        quantity: (portfolio.quantity += transaction.quantity)
      },
      {
        returning: true,
        where: {
          userId: req.params.userId,
          ticker: req.body.ticker
        }
      }
    );

    // console.log(portfolio);
    res.json(transaction);
  } catch (err) {
    next(err);
  }
};
