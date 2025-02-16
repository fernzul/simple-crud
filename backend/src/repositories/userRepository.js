import User from "../models/userModel.js";
import bcrypt from "bcrypt";

const getAllUsers = async () => {
    try {
        return await User.find();
    } catch (error) {
        throw new Error(error);
    }
};

const getUser = async (id) => {
    try {
        return await User.findById(id);
    } catch (error) {
        throw new Error(error);
    }
};

const saveUser = async ({ name, userName, password, email, phone }) => {
    try {
        const user = new User({ name, userName, password, email, phone });
        return await user.save(); 
    } catch (error) {
        throw new Error(error);
    }
};

const validateUserLogin = async (login, passowrd) => {
    try {
        const user = await User.findOne({login});
        if(!user) return null;

        const isMatch = await bcrypt.compare(passowrd, user.password);
        return isMatch ? user : null;        
    } catch (error) {
        throw new Error(error);
    }
}

const updateUser = async (id, { name, userName, password, email, phone }) => {
    try {
        let updateData = { name, userName, email, phone };
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        return await User.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
        throw new Error(error);
    }
};

const deleteUser = async (id) => {
    try {
        return await User.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
};

const getUserByLogin = async (login) => {
    try {
        return await User.findOne({ login });
    } catch (error) {
        throw new Error(error);
    }
};

const getUserByEmail = async (email) => {
    try {
        return await User.findOne({ email });
    } catch (error) {
        throw new Error(error);
    }
};

const userRepository = {
    getAllUsers,
    getUser,
    saveUser,
    validateUserLogin,
    updateUser,
    deleteUser,
    getUserByLogin,
    getUserByEmail
};

export default userRepository;