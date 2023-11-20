import Sequelize, {  DataTypes } from "sequelize";
import { sequelize } from "../connectDb/dbPostgres.js";

export const RegisterForm = sequelize.define(
  "RegisterForm",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    legalName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    academicLevel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    hooks: {
      beforeValidate: (registerform, options) => {
        if (registerform.legalName) {
          registerform.legalName = registerform.legalName.trim();
        }
      },
    },
  }
);
