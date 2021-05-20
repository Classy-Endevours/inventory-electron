/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-dynamic-require */
const path = require('path');

const isDev = require('electron-is-dev');
const models = isDev
  ? require('../models')
  : require(`${path.join(__dirname, '', '../models')}`);

// Sync Sequelize and the databse
models.sequelize
  .sync()
  .then(() => console.log('Connected'))
  .catch((error) => console.log(error));

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
