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
