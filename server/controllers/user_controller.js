// api call functions here

const { Stock, User, Transaction } = require("../db/models");

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
    const singleUser = await User.findByPk(req.params.userId, {
      include: [{ model: Stock }]
    });
    res.json(singleUser);
  } catch (err) {
    next(err);
  }
};

exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const limited = {
      email: user.email
    };
    res.json(limited);
  } catch (err) {
    next(err);
  }
};

exports.editUserProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    user.email = req.body.email;
    await user.save();
    res.json(user);
  } catch (err) {
    next(err);
  }
};
