const router = require("express").Router();

const { isAdminMiddleware, isUserMiddleware } = require("../security");
const { Transaction, Stock, User } = require("../db/models");
const transaction_control = require("../controllers/transaction_controller");

module.exports = router;

// router.get("/", isAdminMiddleware, transaction_control.getAllTransactions);
router.get("/", transaction_control.getAllTransactions);

router.get("/userstocks", transaction_control.getUserTransactions);

router.post("/purchase", transaction_control.postPurchase);
