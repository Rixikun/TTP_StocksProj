const router = require("express").Router();

const { isAdminMiddleware, isUserMiddleware } = require("../security");
const user_control = require("../controllers/user_controller");

module.exports = router;

router.get("/", isAdminMiddleware, user_control.getAllUsers);

router.get("/:userId", isUserMiddleware, user_control.getUser);

router.get("/:userId/profile", isUserMiddleware, user_control.getUserProfile);

router.put("/:userId/profile", isUserMiddleware, user_control.editUserProfile);
