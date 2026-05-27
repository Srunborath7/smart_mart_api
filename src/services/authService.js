const bcrypt = require('bcryptjs');
const User = require('../models/user');

const registerUser = async (name, email, password, role) => {

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || 'user'
    });

    return user;
};

const loginUser = async (email,password) =>{
    const user = await User.findOne({where:{email}});
    if(!user){
        throw new Error("User not found!");
    }
    const matchPassword = await bcrypt.compare(password, user.password);

    if(!matchPassword){
        throw new Error("Invalide password");
    }
    return user;
};

const getMe = async (userId) => {

    const user = await User.findByPk(userId, {
        attributes: ['id', 'name', 'email', 'role', 'created_at']
    });

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};
const getUsers = async () => {

    const user = await User.findAll();

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};
module.exports = {
    registerUser,
    loginUser,
    getMe,
    getUsers
};