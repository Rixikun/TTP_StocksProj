const router = require("express").Router();

const { isAdminMiddleware, isUserMiddleware } = require("../security");
const transaction_control = require("../controllers/transaction_controller");

module.exports = router;

// router.get("/", transaction_control.getAllTransactions);
router.get("/", isAdminMiddleware, transaction_control.getAllTransactions);

router.get(
  "/view/:userId",
  isUserMiddleware,
  transaction_control.getUserTransactions
);
