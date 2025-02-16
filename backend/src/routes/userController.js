import userRepository from "../repositories/userRepository.js";

const getAllUsers = async (req, res) => {
    try {
        const users = await userRepository.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await userRepository.getUser(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};

const getUserByLogin = async (req, res) => {
    try {
        const { login } = req.params;
        const user = await userRepository.getUserByLogin(login);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user by login", error: error.message });
    }
};

const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await userRepository.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user by email", error: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, userName, password, email, phone } = req.body;
        if (!name || !userName || !password || !email || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newUser = await userRepository.saveUser({ name, userName, password, email, phone });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await userRepository.updateUser(req.params.id, req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await userRepository.deleteUser(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};

const userController = {
    getAllUsers,
    getUserById,
    getUserByLogin,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
};

export default userController;