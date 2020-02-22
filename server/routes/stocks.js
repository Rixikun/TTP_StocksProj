const router = require("express").Router();

const { isAdminMiddleware, isUserMiddleware } = require("../security");
const stock_control = require("../controllers/stock_controller");

module.exports = router;

router.get("/", stock_control.getStocks);
