const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class inventoryOut extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ items, vendor }) {
      // define association here
      this.belongsTo(vendor, {
        foreignKey: 'vendorId',
      });
      this.belongsTo(items, {
        foreignKey: 'itemId',
      });
    }
  }
  inventoryOut.init(
    {
      rate: DataTypes.FLOAT,
      quantity: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'inventoryOut',
    },
  );
  return inventoryOut;
};
