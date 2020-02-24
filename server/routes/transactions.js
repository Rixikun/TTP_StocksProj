const router = require("express").Router();

const { isAdminMiddleware, isUserMiddleware } = require("../security");
const { Transaction } = require("../db/models");
const transaction_control = require("../controllers/transaction_controller");

module.exports = router;

// router.get("/", isAdminMiddleware, transaction_control.getAllTransactions);
router.get("/", transaction_control.getAllTransactions);

router.get("/userstocks", transaction_control.getUserTransactions);

router.post("/create", async (req, res) => {
  try {
    const savedOrder = await Transaction.create(
      req.body,
      { w: 1 },
      { returning: true }
    );
    req.body.stocks.forEach(async item => {
      const stock = await stock.findById(item.id);
      if (!stock) {
        return res.status(400);
      }
      const so = {
        userId: savedOrder.id,
        stockId: item.id,
        quantity: item.quantity
      };

      const savedSO = await Transaction.create(
        so,
        { w: 1 },
        { returning: true }
      );
    });
    return res.status(200).json(savedOrder);
  } catch (err) {
    next(err);
  }
});
