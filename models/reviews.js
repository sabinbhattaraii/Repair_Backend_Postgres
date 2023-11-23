import Sequelize, { DataTypes } from "sequelize";
import { sequelize } from "../connectDb/dbPostgres.js";
import { User } from "./user.js";

export const Reviews = sequelize.define(
  "Reviews",
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
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

Reviews.belongsTo(User, {
  foreignKey: "user",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
