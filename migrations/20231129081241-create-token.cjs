'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TokenData', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please enter your userId" },
        },
      },
      type: {
        type: Sequelize.STRING,
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
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TokenData');
  }
};