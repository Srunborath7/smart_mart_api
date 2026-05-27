// ==========================================
// src/routes/chatRoomRoutes.js
// ==========================================

const router = require('express').Router();

const chatRoomController =
require('../controllers/chatRoomController');

// GET ALL
router.get(
    '/',
    chatRoomController.index
);

// GET ONE
router.get(
    '/:id',
    chatRoomController.show
);

// CREATE
router.post(
    '/',
    chatRoomController.store
);

// UPDATE
router.put(
    '/:id',
    chatRoomController.update
);

// DELETE
router.delete(
    '/:id',
    chatRoomController.destroy
);

module.exports = router;