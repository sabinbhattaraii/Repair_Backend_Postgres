import Sequelize, { DataTypes } from "sequelize";
import { sequelize } from "../connectDb/dbPostgres.js";
import { Categories } from "./category.js";
import { User } from "./user.js";

export const Training = sequelize.define(
  "Training",
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    career: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    syllabus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validator: {
        len: {
          args: [1, 10],
          msg: "Priority must be between 1 to 10",
        },
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ratings: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    numOfReviews: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
    hooks: {
      beforeValidate: (training, options) => {
        if (training.title) {
          training.title = training.title.trim();
        }
      },
    },
  }
);

Training.belongsTo(Categories, {
  foreignKey: "category",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

Training.belongsTo(User, {
  foreignKey: "user",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});