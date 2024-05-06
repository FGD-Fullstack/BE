const express = require("express");
const router = express.Router();
const userRouter = require("../controllers/userController");

router.get("/users", userRouter.getAll);
router.post("/users", userRouter.create);
router.get("/users/:id", userRouter.getOne);
router.put("/users/:id", userRouter.update);
router.delete("/users/:id", userRouter.delete);

module.exports = router;
