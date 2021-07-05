const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class challan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ inventoryOut, items, settings }) {
      // define association here
      this.belongsTo(inventoryOut, {
        foreignKey: 'inventoryOutId',
      });
      this.belongsTo(items, {
        foreignKey: 'itemId',
      });
      this.belongsTo(settings, {
        foreignKey: 'settingsId',
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
