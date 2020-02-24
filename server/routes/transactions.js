const router = require("express").Router();

const { isAdminMiddleware, isUserMiddleware } = require("../security");
const { Transaction, Stock, User } = require("../db/models");
const transaction_control = require("../controllers/transaction_controller");

module.exports = router;

// router.get("/", isAdminMiddleware, transaction_control.getAllTransactions);
router.get("/", transaction_control.getAllTransactions);

router.get("/userstocks", transaction_control.getUserTransactions);

// router.post("/create", async (req, res, next) => {
//   try {
//     const savedOrder = await Transaction.create(
//       req.body,
//       { w: 1 },
//       { returning: true }
//     );
//     req.body.stocks.forEach(async item => {
//       const stock = await Stock.findById(item.id);
//       if (!stock) {
//         return res.status(400);
//       }
//       const so = {
//         userId: savedOrder.id,
//         stockId: item.id,
//         quantity: item.quantity
//       };

//       const savedSO = await Transaction.create(
//         so,
//         { w: 1 },
//         { returning: true }
//       );
//     });
//     return res.status(200).json(savedOrder);
//   } catch (err) {
//     next(err);
//   }
// });

router.post("/purchase", async (req, res, next) => {
  try {
    const transaction = await Transaction.create({
      quantity: req.body.quantity,
      userId: req.body.userId
    });
    const stock = await Stock.create({
      ticker: req.body.ticker,
      transactionId: transaction.id,
      userId: transaction.userId,
      price: 50
    });
    transaction.totalPrice = req.body.quantity * stock.price;
    transaction.save();
    // console.log(transaction);
    res.json(transaction);
  } catch (err) {
    next(err);
  }
});
