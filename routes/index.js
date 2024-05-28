const express = require("express");
const router = express.Router();
const userRouter = require("../controllers/userController");
const authRouter = require("../controllers/authcontroller");

router.get("/users", userRouter.getAll);
router.post("/users", userRouter.create);
router.get("/users/:id", userRouter.getOne);
router.put("/users/:id", userRouter.update);
router.delete("/users/:id", userRouter.delete);

router.post("/register", authRouter.register);
router.post("/login", authRouter.login);

module.exports = router;
