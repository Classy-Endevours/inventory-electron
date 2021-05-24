const Sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      productName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      composition: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      percent: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      hsnCode: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      isDeleted: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('items');
  },
};
