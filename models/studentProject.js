import Sequelize, { DataTypes } from "sequelize";
import { sequelize } from "../connectDb/dbPostgres.js";

export const StudentProject = sequelize.define(
  "StudentProject",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    gitHubLink: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    hooks: {
      beforeValidate: (studentproject, options) => {
        if (studentproject.title) {
          studentproject.title = studentproject.title.trim();
        }
        if (studentproject.name) {
          studentproject.name = studentproject.name.trim();
        }
      },
    },
  }
);
