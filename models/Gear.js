const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Gear extends Model {}

Gear.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_name: {
            type: DataTypes.VARCHAR(50),
            allowNull: false,
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        gear_size: {
            type: DataTypes.VARCHAR(10),
            allowNull: true
        },
        tag_id: {
            type: DataType.INTEGER,
            allowNull: false
        },
        brand_name: {
            type: DataTypes.VARCHAR(100),
            allowNull: true
        }

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Gear',
    }
);
module.exports = Gear;