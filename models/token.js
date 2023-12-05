import Sequelize, { DataTypes } from "sequelize";
import { sequelize } from "../connectDb/dbPostgres.js";

export const TokenDatas = sequelize.define(
  "TokenData",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Please enter your userId" },
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        isIn: {
          args: [["ACCESS", "RESET_PASSWORD", "VERIFY_EMAIL"]],
          msg: "Invalid token type",
        },
      },
      defaultValue: "ACCESS",
    },
    expiration: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
  },
  { freezeTableName: true }
);