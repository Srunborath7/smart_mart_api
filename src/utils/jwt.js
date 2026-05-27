const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {

    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '15m'
        }
    );

};

/**
 * REFRESH TOKEN
 * Long expiration
 */
const generateRefreshToken = (user, rememberMe = false) => {

    const expiresIn = rememberMe ? '30d' : '7d';

    return jwt.sign(
        {
            id: user.id
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn
        }
    );

};

module.exports = {
    generateAccessToken,
    generateRefreshToken
};