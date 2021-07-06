/* eslint-disable global-require */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-dynamic-require */
const path = require('path');

const isDev = require('electron-is-dev');
const fs = require('fs');
const { Sequelize } = require('sequelize');
const Umzug = require('umzug');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const config = isDev
  ? require('../config/config')[env]
  : require(`${path.join(__dirname, '', '../config/config.js')}`)[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config);
}
const migrations = new Umzug({
  migrations: {
    // indicates the folder containing the migration .js files
    path: path.join(__dirname, '../migrations'),
    // inject sequelize's QueryInterface in the migrations
    params: [sequelize.getQueryInterface()],
  },
  storage: 'sequelize',
  storageOptions: {
    sequelize, // here should be a sequelize instance, not the Sequelize module
  },
  logger: console,
});
const seeders = new Umzug({
  migrations: {
    // indicates the folder containing the migration .js files
    path: path.join(__dirname, '../seeders'),
    // inject sequelize's QueryInterface in the migrations
    params: [sequelize.getQueryInterface()],
  },
  storage: 'sequelize',
  storageOptions: {
    sequelize, // here should be a sequelize instance, not the Sequelize module
  },
  logger: console,
});

(async () => {
  await migrations.up();
  await seeders.up();
  const models = isDev
    ? require('../models')
    : require(`${path.join(__dirname, '', '../models')}`);

  // Sync Sequelize and the databse
  models.sequelize
    .sync()
    .then(() => console.log('Connected'))
    .catch((error) => console.log(error));
})();

// include User Controller
isDev
  ? require('../controller/userController')
  : require(`${path.join(__dirname, '', '../controller/userController')}`);

// include items Controller
isDev
  ? require('../controller/itemsController')
  : require(`${path.join(__dirname, '', '../controller/itemsController')}`);

// include supplier Controller
isDev
  ? require('../controller/supplierController')
  : require(`${path.join(__dirname, '', '../controller/supplierController')}`);

// include vendor Controller
isDev
  ? require('../controller/vendorController')
  : require(`${path.join(__dirname, '', '../controller/vendorController')}`);

// include inventory in Controller
isDev
  ? require('../controller/inventoryInController')
  : require(`${path.join(
      __dirname,
      '',
      '../controller/inventoryInController',
    )}`);

// include inventory Out Controller
isDev
  ? require('../controller/inventoryOutController')
  : require(`${path.join(
      __dirname,
      '',
      '../controller/inventoryOutController',
    )}`);

// include Challan Controller
isDev
  ? require('../controller/challanController')
  : require(`${path.join(__dirname, '', '../controller/challanController')}`);

// include Dashboard Controller
isDev
  ? require('../controller/dashboardController')
  : require(`${path.join(__dirname, '', '../controller/dashboardController')}`);

// include Settings Controller
isDev
  ? require('../controller/settingsController')
  : require(`${path.join(__dirname, '', '../controller/settingsController')}`);
