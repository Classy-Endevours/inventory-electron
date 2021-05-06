const { ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const response = isDev
  ? require('../config/responseConfig')
  : require(`${path.join(__dirname, '', '../config/responseConfig')}`);
const users = isDev
  ? require('../models').users
  : require(`${path.join(__dirname, '', '../models')}`).users;

ipcMain.on('login-message', async (event, arg) => {
  try {
    const user = await users.findOne({
      where: {
        username: arg.username,
      },
    });
    if (user !== null) {
      const match = await bcrypt.compare(arg.password, user.password);
      if (match)
        event.reply('login-reply', response.success('Login Successfull', user));
      else {
        const err = new Error("Username or passwaord didn't match the records");
        throw err;
      }
    } else {
      const err = new Error("Username or passwaord didn't match the records");
      throw err;
    }
  } catch (error) {
    event.reply('login-reply', response.error(error.message));
  }
});
