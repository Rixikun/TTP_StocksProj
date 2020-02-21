const router = require("express").Router();
const { User, Stock } = require("../db/models");
const { isAdminMiddleware, isUserMiddleware } = require("../security");
module.exports = router;

router.get("/", isAdminMiddleware, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "email"]
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", isUserMiddleware, async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.userId, {
      include: [{ model: Stock }]
    });
    res.json(singleUser);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId/profile", isUserMiddleware, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const limited = {
      email: user.email
    };
    res.json(limited);
  } catch (err) {
    next(err);
  }
});

router.put("/:userId/profile", isUserMiddleware, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    user.email = req.body.email;
    await user.save();
    res.json(user);
  } catch (err) {
    next(err);
  }
});
