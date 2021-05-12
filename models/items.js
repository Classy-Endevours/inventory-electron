const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  items.init(
    {
      productName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      composition: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      percent: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      hsnCode: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      isDeleted: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'items',
    },
  );
  return items;
};
