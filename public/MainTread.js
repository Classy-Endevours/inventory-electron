/* eslint-disable import/no-dynamic-require */
const path = require('path');

const isDev = require('electron-is-dev');
const models = isDev
  ? require('../models')
  : require(`${path.join(__dirname, '', '../models')}`);

const { users } = models;
const { ipcMain } = require('electron');

models.sequelize
  .sync()
  .then(() => console.log('Connected'))
  .catch((error) => console.log(error));

isDev
  ? require('../controller/userController')
  : require(`${path.join(__dirname, '', '../controller/userController')}`);
