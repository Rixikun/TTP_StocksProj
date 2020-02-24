const router = require("express").Router();

const { isAdminMiddleware, isUserMiddleware } = require("../security");
const stock_control = require("../controllers/stock_controller");

module.exports = router;

router.get("/", isAdminMiddleware, stock_control.getStocks);
router.get("/search", stock_control.searchStock);
router.get("/select", stock_control.selectStock);
router.post("/purchase/:userId", isUserMiddleware, stock_control.postPurchase);
