import Sequelize,{ DataTypes }  from "sequelize";
import { sequelize } from "../connectDb/dbPostgres.js";

export const FeedBacks = sequelize.define(
    'FeedBacks',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        legalName : {
            type : DataTypes.STRING,
            allowNull : false
        },
        email : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true
        },
        message : {
            type : DataTypes.TEXT,
            allowNull : false
        },
        phoneNumber : {
            type : DataTypes.STRING,
            allowNull : false
        }
    },
    { freezeTableName: true }
)