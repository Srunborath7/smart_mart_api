const authService = require('../services/authService');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');
const { successResponse, errorResponse } = require('../utils/response');
const jwt = require('jsonwebtoken');
const sendTelegramMessage = require('../utils/telegram');

const register = async (req, res) => {
    try {

        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return errorResponse(res, "All fields are required");
        }

        const user = await authService.registerUser(name, email, password, role);

        return res.status(201).json({
            success: true,
            message: "Register success",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        return errorResponse(res, error.message);
    }
};

const login = async (req, res) => {
    try {

        const { email, password, rememberMe } = req.body;

        if (!email || !password) {
            return errorResponse(res, "Email and password required");
        }

        const user = await authService.loginUser(email, password);

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user, rememberMe);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: rememberMe
                ? 30 * 24 * 60 * 60 * 1000
                : 7 * 24 * 60 * 60 * 1000
        });
        
        const safeUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        // Telegram log (optional)
        const loginTime = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Phnom_Penh',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        await sendTelegramMessage(`
            🔥 LOGIN ALERT

            👤 Name: ${user.name}
            📧 Email: ${user.email}
            🛡️ Role: ${user.role}
            🕒 Time: ${loginTime}
        `);

        return successResponse(res, "Login success", {
            token: accessToken,
            user: safeUser
        });

    } catch (error) {
        return errorResponse(res, error.message);
    }
};

const getMe = async (req, res) => {
    try {

        const userId = req.user.id;
        const user = await authService.getMe(userId);

        return successResponse(res, "User profile fetched", user);

    } catch (error) {
        return errorResponse(res, error.message);
    }
};

const getAllUsers = async (req, res) => {
    try {

        const users = await authService.getUsers();

        return successResponse(res, "Users fetched successfully", users);

    } catch (error) {
        return errorResponse(res, error.message);
    }
};

const refreshToken = async (req, res) => {
    try {

        const token = req.cookies.refreshToken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No refresh token'
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_REFRESH_SECRET
        );

        const newAccessToken = jwt.sign(
            { id: decoded.id },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        return res.json({
            success: true,
            accessToken: newAccessToken
        });

    } catch (error) {
        return res.status(403).json({
            success: false,
            message: 'Invalid refresh token'
        });
    }
};

const logout = async (req, res) => {
    try {

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });

        return res.json({
            success: true,
            message: 'Logout success'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    register,
    login,
    getMe,
    getAllUsers,
    refreshToken,
    logout
};