const Sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('challans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      productName: {
        type: Sequelize.STRING,
      },
      truckNo: {
        type: Sequelize.STRING,
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
      inventoryOutId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'inventoryOut',
          key: 'id',
        },
        allowNull: false,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('challans');
  },
};
