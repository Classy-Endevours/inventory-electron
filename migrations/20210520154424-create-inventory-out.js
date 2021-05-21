const Sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('inventoryOuts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      rate: {
        type: Sequelize.FLOAT,
      },
      quantity: {
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      itemId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'items',
          key: 'id',
        },
        allowNull: false,
      },
      vendorId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'vendor',
          key: 'id',
        },
        allowNull: false,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('inventoryOuts');
  },
};
