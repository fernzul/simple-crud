import UserRepository from "../repositories/userRepository.js";

const getAllUsers = async () => {
    return await UserRepository.getAllUsers();
};

const getUser = async (id) => {
    return await UserRepository.getUser(id);
};

const saveUser = async ({ name, login, password, email, phone }) => {
    return await UserRepository.saveUser({ name, login, password, email, phone });
};

const updateUser = async (id, { name, login, password, email, phone }) => {
    return await UserRepository.updateUser(id, { name, login, password, email, phone });
};

const deleteUser = async (id) => {
    return await UserRepository.deleteUser(id);
};

const getUserByLogin = async (login) => {
    return await UserRepository.getUserByLogin(login);
};

const getUserByEmail = async (email) => {
    return await UserRepository.getUserByEmail(email);
};

const validateUserLogin = async (login, password) => {
    return await UserRepository.validateUserLogin(login, password);
};

const userService = {
    getAllUsers,
    getUser,
    saveUser,
    updateUser,
    deleteUser,
    getUserByLogin,
    getUserByEmail,
    validateUserLogin
};

export default userService;
