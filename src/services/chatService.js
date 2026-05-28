const Message = require('../models/message');
const sendTelegramMessage = require('../utils/telegram');

const store = async (data, io) => {

    if (!data.room_id || !data.sender_name || !data.sender_role || !data.message) {
        throw new Error("Missing required fields");
    }

    const message = await Message.create({
        room_id: data.room_id,
        sender_name: data.sender_name,
        sender_role: data.sender_role,
        message: data.message
    });

    await sendTelegramMessage(
        `🧾 [INCOMING MESSAGE]

        ┌────────────────────
        │ 👤 Name : ${data.sender_name}
        │ 🛡 Role : ${data.sender_role}
        ├────────────────────
        │ 💬 Content:
        │ ${data.message}
        ├────────────────────
        │ 🕒 ${new Date().toLocaleString()}
        └────────────────────`
        );

    if (io) {
        io.to(data.room_id).emit('receiveMessage', message);
    }

    return message;
};

const index = async () => {

    const messages = await Message.findAll({
        order: [['createdAt', 'ASC']]
    });

    return messages;
};

const getByRoom = async (room_id) => {

    if (!room_id) {
        throw new Error("room_id required");
    }

    const messages = await Message.findAll({
        where: { room_id },
        order: [['createdAt', 'ASC']]
    });

    return messages;
};

module.exports = {
    store,
    index,
    getByRoom
};