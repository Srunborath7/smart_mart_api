const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get("/me",authMiddleware, authController.getMe);
router.get("/",authMiddleware,roleMiddleware('admin'), authController.getAllUsers);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);
module.exports = router;