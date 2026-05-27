// ==========================================
// src/controllers/chatRoomController.js
// ==========================================

const chatRoomService = require('../services/chatRoomService');

// GET ALL
const index = async (req, res) => {

    try {

        const rooms = await chatRoomService.index();

        return res.json({
            success: true,
            data: rooms
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// GET ONE
const show = async (req, res) => {

    try {

        const room = await chatRoomService.show(
            req.params.id
        );

        return res.json({
            success: true,
            data: room
        });

    } catch (error) {

        return res.status(404).json({
            success: false,
            message: error.message
        });

    }
};

// CREATE
const store = async (req, res) => {

    try {

        const room = await chatRoomService.store({

            name: req.body.name,
            type: req.body.type,
            description: req.body.description

        });

        return res.json({
            success: true,
            message: 'Room created successfully',
            data: room
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// UPDATE
const update = async (req, res) => {

    try {

        const room = await chatRoomService.update(
            req.params.id,
            {
                name: req.body.name,
                type: req.body.type,
                description: req.body.description,
                is_active: req.body.is_active
            }
        );

        return res.json({
            success: true,
            message: 'Room updated successfully',
            data: room
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// DELETE
const destroy = async (req, res) => {

    try {

        await chatRoomService.destroy(
            req.params.id
        );

        return res.json({
            success: true,
            message: 'Room deleted successfully'
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    index,
    show,
    store,
    update,
    destroy
};