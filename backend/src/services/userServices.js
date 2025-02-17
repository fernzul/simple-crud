import UserRepository from "../repositories/userRepository.js";

const getAllUsers = async () => {
    return await UserRepository.getAllUsers();
};

const getUser = async (id) => {
    return await UserRepository.getUser(id);
};

const saveUser = async ({ name, lastName, userName, password, email, phone }) => {
    return await UserRepository.saveUser({ name, lastName, userName, password, email, phone });
};

const updateUser = async (id, { name, lastName, userName, password, email, phone }) => {
    return await UserRepository.updateUser(id, { name, lastName, userName, password, email, phone });
};

const deleteUser = async (id) => {
    return await UserRepository.deleteUser(id);
};

const getUserByUserName = async (userName) => {
    return await UserRepository.getUserByUserName(userName);
};

const getUserByEmail = async (email) => {
    return await UserRepository.getUserByEmail(email);
};

const validateUserName = async (userName, password) => {
    return await UserRepository.validateUserName(userName, password);
};

const userService = {
    getAllUsers,
    getUser,
    saveUser,
    updateUser,
    deleteUser,
    getUserByUserName,
    getUserByEmail,
    validateUserName
};

export default userService;
