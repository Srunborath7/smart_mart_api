const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ChatRoom = sequelize.define('ChatRoom', {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    type: {
        type: DataTypes.ENUM(
            'GROUP',
            'PRIVATE',
            'ORDER'
        ),
        defaultValue: 'GROUP'
    },

    description: {
        type: DataTypes.STRING(255),
        allowNull: true
    },

    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

}, {
    tableName: 'chat_rooms',
    timestamps: true
});

module.exports = ChatRoom;