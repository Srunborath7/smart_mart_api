const chatService = require('../services/chatService');
const store = async (req, res) => {

    try {

        const io = req.app.get('io');

        const message = await chatService.store({
            room_id: req.body.room_id,
            sender_name: req.body.sender_name,
            sender_role: req.body.sender_role,
            message: req.body.message
        }, io);

        return res.json({
            success: true,
            message: "Message sent successfully",
            data: message
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const index = async (req, res) => {

    try {

        const messages = await chatService.index();

        return res.json({
            success: true,
            data: messages
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getByRoom = async (req, res) => {

    try {

        const messages = await chatService.getByRoom(req.params.room_id);

        return res.json({
            success: true,
            data: messages
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    store,
    index,
    getByRoom
};