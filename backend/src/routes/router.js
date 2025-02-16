import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({ message: "API is running!" });
});

router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.get("/users/login/:login", userController.getUserByLogin);
router.get("/users/email/:email", userController.getUserByEmail);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

export default router;