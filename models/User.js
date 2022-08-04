const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
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
        user_location: {
            type: DataTypes.VARCHAR(100),
            allowNull: false
        },
        gearhead_name: {
            type: DataTypes.INTEGER,
            allowNull: false
       
        },
        gear_id: {
            type: DataType.INTEGER,
            allowNull: false
        }

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'User',
    }
);
module.exports = User;