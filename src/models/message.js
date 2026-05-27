// ===============================
// src/models/message.js
// ===============================

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Message = sequelize.define('Message', {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    room_id: {
        type: DataTypes.UUID,
        allowNull: false
    },

    sender_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    sender_role: {
        type: DataTypes.STRING,
        allowNull: false
    },

    message: {
        type: DataTypes.TEXT,
        allowNull: false
    }

}, {
    tableName: 'messages',
    timestamps: true
});

module.exports = Message;