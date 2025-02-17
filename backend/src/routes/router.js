import express from "express";
import userController from "./userController.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({ message: "API is running!" });
});

router.use("/user", userController);

export default router;