import express from "express";
import userService from "../services/userServices.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
});

// Curti isso aqui, tava dando conflito com 2 router.get, um pra userName e outro para Email
// assim ficou bacana, talvez exista uma forma melhor de lidar com isso, por enquanto o if serve
router.get('/:param', async (req, res) => {
    try {
        const { param } = req.params;
        let user;

        if (param.includes('@')) {
            user = await userService.getUserByEmail(param);
        } else {
            user = await userService.getUserByUserName(param);
        }
        if (!user) {
            return res.status(404).json({ message: "User/Email not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user/email", error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await userService.getUser(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, lastName, userName, password, email, phone } = req.body;
        if (!name || !lastName|| !userName || !password || !email || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newUser = await userService.saveUser({ name, lastName, userName, password, email, phone });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await userService.deleteUser(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
});

export default router;