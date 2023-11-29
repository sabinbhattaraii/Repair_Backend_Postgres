import  Sequelize, {DataTypes} from "sequelize";
import { sequelize } from "../connectDb/dbPostgres.js";

export const TokenDatas = sequelize.define(
    'TokenData',
    {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        token : {
            type : DataTypes.STRING,
            allowNull : false
        }
    },
    { freezeTableName : true }
);