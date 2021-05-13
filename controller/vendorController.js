const { ipcMain } = require('electron');
const isDev = require('electron-is-dev');

const response = isDev
  ? require('../config/responseConfig')
  : require(`${path.join(__dirname, '', '../config/responseConfig')}`);
const vendor = isDev
  ? require('../models').vendor
  : require(`${path.join(__dirname, '', '../models')}`).vendor;

ipcMain.on('vendor-create-message', async (event, arg) => {
  try {
    const item = await vendor.create(arg);
    if (item !== null) {
      event.reply(
        'vendor-create-reply',
        response.success('Item Saved successfully', item),
      );
    } else {
      const err = new Error('Item saving failed');
      throw err;
    }
  } catch (error) {
    event.reply('vendor-create-reply', response.error(error.message));
  }
});

ipcMain.on('vendor-fetch-message', async (event, arg) => {
  try {
    const options = {
      order: [['updatedAt', 'DESC']],
    };
    if (arg?.where) options.where = arg.where;
    if (arg?.offset) {
      options.offset = arg.offset;
      options.limit = 15;
    }
    const item = await vendor.findAll(options);
    if (item.length > 0) {
      event.reply(
        'vendor-fetch-reply',
        response.success('vendor Found successfully', { vendor: item }),
      );
    } else {
      const err = new Error('No vendor Found');
      throw err;
    }
  } catch (error) {
    event.reply('vendor-fetch-reply', response.error(error.message));
  }
});

ipcMain.on('vendor-update-message', async (event, arg) => {
  try {
    const options = {};
    if (arg.where) options.where = arg.where;

    const item = await vendor.update(arg.values, options);
    if (item.length > 0) {
      event.reply(
        'vendor-update-reply',
        response.success('vendor Updated successfully', item),
      );
    } else {
      const err = new Error('No vendor Updated');
      throw err;
    }
  } catch (error) {
    event.reply('vendor-update-reply', response.error(error.message));
  }
});
