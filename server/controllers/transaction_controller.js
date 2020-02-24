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
    // const transactions = await Transaction.findByPk(req.params.userId, {
    //   include: [{ model: Transaction }]
    // });
    const transactions = await Transaction.findByPk(req.body.userId);
    // console.log(transactions);
    res.json(transactions);
  } catch (err) {
    next(err);
  }
};
