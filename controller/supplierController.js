const { ipcMain } = require('electron');
const isDev = require('electron-is-dev');

const response = isDev
  ? require('../config/responseConfig')
  : require(`${path.join(__dirname, '', '../config/responseConfig')}`);
const supplier = isDev
  ? require('../models').supplier
  : require(`${path.join(__dirname, '', '../models')}`).supplier;

ipcMain.on('supplier-create-message', async (event, arg) => {
  try {
    const item = await supplier.create(arg);
    if (item !== null) {
      event.reply(
        'supplier-create-reply',
        response.success('Item Saved successfully', item),
      );
    } else {
      const err = new Error('Item saving failed');
      throw err;
    }
  } catch (error) {
    event.reply('supplier-create-reply', response.error(error.message));
  }
});

ipcMain.on('supplier-fetch-message', async (event, arg) => {
  try {
    const options = {
      order: [['updatedAt', 'DESC']],
    };
    if (arg?.where) options.where = arg.where;
    if (arg?.offset) {
      options.offset = arg.offset;
      options.limit = 15;
    }
    const item = await supplier.findAll(options);
    if (item.length > 0) {
      event.reply(
        'supplier-fetch-reply',
        response.success('supplier Found successfully', { supplier: item }),
      );
    } else {
      const err = new Error('No supplier Found');
      throw err;
    }
  } catch (error) {
    event.reply('supplier-fetch-reply', response.error(error.message));
  }
});

ipcMain.on('supplier-update-message', async (event, arg) => {
  try {
    const options = {};
    if (arg.where) options.where = arg.where;

    const item = await supplier.update(arg.values, options);
    if (item.length > 0) {
      event.reply(
        'supplier-update-reply',
        response.success('supplier Updated successfully', item),
      );
    } else {
      const err = new Error('No supplier Updated');
      throw err;
    }
  } catch (error) {
    event.reply('supplier-update-reply', response.error(error.message));
  }
});
