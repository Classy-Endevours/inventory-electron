const Sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('challans', 'settingsId', {
      type: Sequelize.INTEGER,
      reference: {
        model: 'settings',
        key: 'id',
      },
      allowNull: false,
    });
  },

  down: async (queryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('challans', 'settingsId');
  },
};
