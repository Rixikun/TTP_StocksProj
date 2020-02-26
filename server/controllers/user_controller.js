// api call functions here

const { Stock, User, Transaction, Portfolio } = require("../db/models");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "email", "name"]
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const users = await User.findByPk(req.params.userId);
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.getPortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findAll({
      where: { userId: req.params.userId }
    });
    res.json(portfolio);
  } catch (err) {
    next(err);
  }
};

exports.postAccount = async (req, res, next) => {
  try {
    res.json("success");
  } catch (err) {
    next(err);
  }
};
