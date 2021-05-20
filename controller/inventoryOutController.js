const { ipcMain } = require('electron');
const isDev = require('electron-is-dev');

const response = isDev
  ? require('../config/responseConfig')
  : require(`${path.join(__dirname, '', '../config/responseConfig')}`);
const { inventoryOut, items, vendor } = isDev
  ? require('../models')
  : require(`${path.join(__dirname, '', '../models')}`);

ipcMain.on('inventoryOut-create-message', async (event, arg) => {
  try {
    const item = await inventoryOut.create(arg);
    await items.decrement('availableQuantity', {
      by: arg.quantity,
      where: { id: arg.itemId },
    });
    if (item !== null) {
      event.reply(
        'inventoryOut-create-reply',
        response.success('Inventory Out Saved successfully', item),
      );
    } else {
      const err = new Error('Inventory Out saving failed');
      throw err;
    }
  } catch (error) {
    event.reply('inventoryOut-create-reply', response.error(error.message));
  }
});

ipcMain.on('inventoryOut-fetch-message', async (event, arg) => {
  try {
    const options = {
      order: [['updatedAt', 'DESC']],
    };
    if (arg?.where) options.where = arg.where;
    if (arg?.offset) {
      options.offset = arg.offset;
      options.limit = 15;
    }
    options.include = [items, vendor];
    options.raw = true;
    options.nest = true;
    const item = await inventoryOut.findAll(options);
    if (item.length > 0) {
      event.reply(
        'inventoryOut-fetch-reply',
        response.success('Inventory Out Found successfully', {
          inventoryOut: item,
        }),
      );
    } else {
      const err = new Error('No Inventory Out Found');
      throw err;
    }
  } catch (error) {
    console.log({ error });
    event.reply('inventoryOut-fetch-reply', response.error(error.message));
  }
});

ipcMain.on('inventoryOut-update-message', async (event, arg) => {
  try {
    const options = {};
    if (arg.where) options.where = arg.where;

    const item = await inventoryOut.update(arg.values, options);
    if (item.length > 0) {
      event.reply(
        'inventoryOut-update-reply',
        response.success('Inventory Out Updated successfully', item),
      );
    } else {
      const err = new Error('No inventory Out Updated');
      throw err;
    }
  } catch (error) {
    event.reply('inventoryOut-update-reply', response.error(error.message));
  }
});
