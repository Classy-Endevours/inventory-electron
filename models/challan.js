const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class challan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ inventoryOut, items }) {
      // define association here
      this.belongsTo(inventoryOut, {
        foreignKey: 'inventoryOutId',
      });
      this.belongsTo(items, {
        foreignKey: 'itemId',
      });
    }
  }
  challan.init(
    {
      productName: DataTypes.STRING,
      truckNo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'challan',
    },
  );
  return challan;
};
