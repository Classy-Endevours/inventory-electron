const Sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('inventoryIns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      rate: {
        type: Sequelize.FLOAT,
      },
      hour: {
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
      },
      supplierId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'supplier',
          key: 'id',
        },
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('inventoryIns');
  },
};
