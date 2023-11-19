import Sequelize, { DataTypes } from "sequelize";
import { sequelize } from "../connectDb/dbPostgres.js";

export const Partners = sequelize.define(
  "Partners",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    companyWebsite: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  { freezeTableName: true }
);
