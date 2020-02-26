const router = require("express").Router();

const { isAdminMiddleware, isUserMiddleware } = require("../security");
const user_control = require("../controllers/user_controller");

module.exports = router;

router.get("/", isAdminMiddleware, user_control.getAllUsers);

router.get("/:userId", user_control.getUser);

router.get(
  "/portfolio/:userId",
  // isUserMiddleware,
  user_control.getPortfolio
);

router.post("/signup", user_control.postAccount);
