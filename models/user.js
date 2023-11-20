import Sequelize, { DataTypes } from "sequelize";
import { sequelize } from "../connectDb/dbPostgres.js";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 30], // Minimum and maximum length
          msg: "Name must be between 3 and 30 characters",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6], // Minimum length
          msg: "Password should be at least 6 characters long",
        },
      },
    },
    role: {
      type: DataTypes.ENUM("SuperAdmin", "Admin"), // ENUM with allowed values
      allowNull: false,
      defaultValue: "Admin", // Default value
    },
  },
  { freezeTableName: true }
);
