const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Brand = sequelize.define("Brand", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    logo_url: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    logo_path: {
        type: DataTypes.TEXT,
        allowNull: true
    }
},{
    tableName: "brands",
    timestamps: true,
    createdAt: "created-at",
    updatedAt: "updated-at"
});
module.exports = Brand;