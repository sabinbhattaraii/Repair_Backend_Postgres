import Sequelize, { DataTypes } from "sequelize";
import { sequelize } from "../connectDb/dbPostgres.js";

export const Testimonial = sequelize.define(
  "Testimonial",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    course: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  { freezeTableName: true }
);
