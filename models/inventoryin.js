const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class inventoryIn extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ supplier, items }) {
      // define association here
      this.belongsTo(supplier, {
        foreignKey: 'supplierId',
      });
      this.belongsTo(items, {
        foreignKey: 'itemId',
      });
    }
  }
  inventoryIn.init(
    {
      rate: DataTypes.FLOAT,
      hour: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'inventoryIn',
    },
  );
  return inventoryIn;
};
