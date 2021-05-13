'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vendor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  vendor.init({
    name: DataTypes.STRING,
    deliveryAddress: DataTypes.STRING,
    gstNo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'vendor',
  });
  return vendor;
};