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

    // fetch(url)
    //   .then(response => response.json()) //<-- dont write 'res' thats taken
    //   .then(stock => res.json(stock.bestMatches));

    const response = await fetch(url);
    const result = await response.json();
    res.json(result.bestMatches);
  } catch (err) {
    next(err);
  }
};

exports.selectStock = async (req, res, next) => {
  try {
    const symbol = req.query.symbol;
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apikeyAV}`;

    // fetch(url)
    //   .then(response => response.json())
    //   .then(stock => res.json(stock["Global Quote"]));

    const response = await fetch(url);
    const result = await response.json();
    if (result["Global Quote"]) {
      res.json(result["Global Quote"]);
    } else {
      res.json("Invalid ticker");
    }
    // console.log(result);
  } catch (err) {
    next(err);
  }
};

const toBigInt = str => {
  let stuff = str.split(".");
  if (stuff.length === 0 || (stuff.length !== 1 && stuff.length !== 2)) {
    return undefined;
  } else {
    if (stuff.length === 1) {
      return BigInt(stuff[0] + "0000");
    } else {
      let l = stuff[0];
      let r = stuff[1].padEnd(4, "0");
      return BigInt(l + r.slice(0, 4));
    }
  }
};

const fromBigInt = x => {
  let l = (x / 10000n).toString();
  let r = (x % 10000n).toString();
  return l + "." + r;
};

exports.postPurchase = async (req, res, next) => {
  try {
    if (
      req.body.quantity.toString().includes(".") ||
      typeof req.body.quantity !== "number" ||
      req.body.quantity < 1
    ) {
      return res.json("Enter whole number of stocks only");
    }
    const symbol = req.body.symbol;
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apikeyAV}`;
    //get Balance & Price
    let user = await User.findByPk(req.params.userId);
    let balance = user.dataValues.balance;
    let price;
    const response = await fetch(url);
    const result = await response.json();
    if (result["Global Quote"]) {
      price = result["Global Quote"]["05. price"]; //<-- still a string
    } else {
      res.json("Invalid ticker");
    }
    price = toBigInt(price);
    balance = toBigInt(balance.toString());
    const totalPrice = BigInt(req.body.quantity.toString()) * price;
    //compare if balance is too low to buy stocks
    if (balance <= totalPrice) {
      return res.json("Balance too low to purchase stocks.");
    }
    let diff = balance - totalPrice;
    diff = Number(fromBigInt(diff));

    //if balance is enough continue:
    //create transaction
    const transaction = await Transaction.create({
      quantity: req.body.quantity,
      userId: req.params.userId,
      totalPrice: Number(
        String(totalPrice / 10000n) + "." + String(totalPrice % 10000n)
      )
    });

    //create stock
    const stock = await Stock.create({
      ticker: symbol,
      transactionId: transaction.id,
      userId: transaction.userId,
      price: Number(result["Global Quote"]["05. price"]),
      open: Number(result["Global Quote"]["02. open"])
    });

    //update portfolio
    let portfolio = await Portfolio.findOne({
      where: { userId: req.params.userId, ticker: symbol }
    });

    if (portfolio === null) {
      portfolio = await Portfolio.create({
        ticker: symbol,
        userId: req.params.userId
      });
    }
    const portfolioData = portfolio.dataValues;
    portfolio.totalPrice =
      Number(transaction.totalPrice) + Number(portfolioData.totalPrice);
    portfolio.quantity += transaction.dataValues.quantity;
    console.log(portfolioData);

    portfolio.save();

    // update user balance
    user.balance = diff;
    user.save();
    res.json("transaction");
  } catch (err) {
    next(err);
  }
};
