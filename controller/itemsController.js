const { ipcMain } = require('electron');
const isDev = require('electron-is-dev');

const response = isDev
  ? require('../config/responseConfig')
  : require(`${path.join(__dirname, '', '../config/responseConfig')}`);
const items = isDev
  ? require('../models').items
  : require(`${path.join(__dirname, '', '../models')}`).items;

ipcMain.on('items-create-message', async (event, arg) => {
  try {
    const item = await items.create(arg);
    if (item !== null) {
      event.reply(
        'items-create-reply',
        response.success('Item Saved successfully', item),
      );
    } else {
      const err = new Error('Item saving failed');
      throw err;
    }
  } catch (error) {
    event.reply('items-create-reply', response.error(error.message));
  }
});

ipcMain.on('items-fetch-message', async (event, arg) => {
  try {
    const options = {
      order: [['updatedAt', 'DESC']],
    };
    if (arg?.where) options.where = arg.where;
    if (arg?.offset) {
      options.offset = arg.offset;
      options.limit = 15;
    }
    const item = await items.findAll(options);
    if (item.length > 0) {
      event.reply(
        'items-fetch-reply',
        response.success('Items Found successfully', item),
      );
    } else {
      const err = new Error('No Items Found');
      throw err;
    }
  } catch (error) {
    event.reply('items-fetch-reply', response.error(error.message));
  }
});

ipcMain.on('items-update-message', async (event, arg) => {
  try {
    const options = {};
    if (arg.where) options.where = arg.where;

    const item = await items.update(arg.values, options);
    if (item.length > 0) {
      event.reply(
        'items-update-reply',
        response.success('Items Updated successfully', item),
      );
    } else {
      const err = new Error('No Items Updated');
      throw err;
    }
  } catch (error) {
    event.reply('items-update-reply', response.error(error.message));
  }
});
