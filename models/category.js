import Sequelize, { DataTypes } from "sequelize";
import { sequelize } from "../connectDb/dbPostgres.js";

export const Categories = sequelize.define(
  "Categories",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    courseType: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  { freezeTableName: true }
);
