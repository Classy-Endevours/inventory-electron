const { ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const { Op } = require('sequelize');

const response = isDev
  ? require('../config/responseConfig')
  : require(`${path.join(__dirname, '', '../config/responseConfig')}`);
const settings = isDev
  ? require('../models').settings
  : require(`${path.join(__dirname, '', '../models')}`).settings;

ipcMain.on('settings-create-message', async (event, arg) => {
  try {
    const item = await settings.create(arg);
    if (item !== null) {
      event.reply(
        'settings-create-reply',
        response.success('Settings Saved successfully', item),
      );
    } else {
      const err = new Error('Settings saving failed');
      throw err;
    }
  } catch (error) {
    event.reply('settings-create-reply', response.error(error.message));
  }
});

ipcMain.on('settings-fetch-message', async (event, arg) => {
  try {
    const options = {
      order: [['isDefault', 'DESC']],
    };
    if (arg?.where) options.where = arg.where;
    if (arg?.offset) {
      options.offset = arg.offset;
      options.limit = 15;
    }
    const item = await settings.findAll(options);
    if (item.length > 0) {
      event.reply(
        'settings-fetch-reply',
        response.success('Settings Found successfully', { settings: item }),
      );
    } else {
      const err = new Error('No settings Found');
      throw err;
    }
  } catch (error) {
    event.reply('settings-fetch-reply', response.error(error.message));
  }
});

ipcMain.on('settings-update-message', async (event, arg) => {
  try {
    const options = {};
    if (arg.where) options.where = arg.where;

    const item = await settings.update(arg.values, options);
    if (item.length > 0) {
      event.reply(
        'settings-update-reply',
        response.success('Settings Updated successfully', item),
      );
    } else {
      const err = new Error('No settings Updated');
      throw err;
    }
  } catch (error) {
    event.reply('settings-update-reply', response.error(error.message));
  }
});

ipcMain.on('settings-default-message', async (event, arg) => {
  try {
    const options = {
      where: {
        id: arg.id,
      },
    };

    const item = await settings.update({ isDefault: true }, options);
    options.where.id = { [Op.ne]: arg.id };
    options.where.isDefault = true;
    const newitem = await settings.update({ isDefault: false }, options);
    if (item.length > 0) {
      event.reply(
        'settings-default-reply',
        response.success('Settings Updated successfully', item),
      );
    } else {
      const err = new Error('No settings Updated');
      throw err;
    }
  } catch (error) {
    event.reply('settings-default-reply', response.error(error.message));
  }
});
