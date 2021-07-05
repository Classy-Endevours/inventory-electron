const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class settings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ challan }) {
      // define association here
      this.hasMany(challan, {
        foreignKey: 'settingsId',
      });
    }
  }
  settings.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      mobile1: DataTypes.STRING,
      mobile2: DataTypes.STRING,
      gstNo: DataTypes.STRING,
      email: DataTypes.STRING,
      isDefault: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'settings',
    },
  );
  return settings;
};
