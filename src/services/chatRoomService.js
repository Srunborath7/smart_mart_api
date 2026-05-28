const ChatRoom = require('../models/chatRoom');

const index = async () => {

    const rooms = await ChatRoom.findAll({
        order: [['createdAt', 'DESC']]
    });

    return rooms;
};

const show = async (id) => {

    const room = await ChatRoom.findByPk(id);

    if (!room) {
        throw new Error('Room not found');
    }

    return room;
};

const store = async (data) => {

    const room = await ChatRoom.create({

        name: data.name,
        type: data.type,
        description: data.description

    });

    return room;
};

const update = async (id, data) => {

    const room = await ChatRoom.findByPk(id);

    if (!room) {
        throw new Error('Room not found');
    }

    await room.update({

        name: data.name,
        type: data.type,
        description: data.description,
        is_active: data.is_active

    });

    return room;
};

const destroy = async (id) => {

    const room = await ChatRoom.findByPk(id);

    if (!room) {
        throw new Error('Room not found');
    }

    await room.destroy();

    return true;
};

module.exports = {
    index,
    show,
    store,
    update,
    destroy
};