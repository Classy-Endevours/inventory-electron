const { ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

const response = isDev
  ? require('../config/responseConfig')
  : require(`${path.join(__dirname, '', '../config/responseConfig')}`);
const { inventoryIn, items, supplier } = isDev
  ? require('../models')
  : require(`${path.join(__dirname, '', '../models')}`);

ipcMain.on('inventoryIn-create-message', async (event, arg) => {
  try {
    const item = await inventoryIn.create(arg);
    await items.increment('availableQuantity', {
      by: arg.quantity,
      where: { id: arg.itemId },
    });
    if (item !== null) {
      event.reply(
        'inventoryIn-create-reply',
        response.success('Inventory In Saved successfully', item),
      );
    } else {
      const err = new Error('Inventory In saving failed');
      throw err;
    }
  } catch (error) {
    event.reply('inventoryIn-create-reply', response.error(error.message));
  }
});

ipcMain.on('inventoryIn-fetch-message', async (event, arg) => {
  try {
    const options = {
      order: [['updatedAt', 'DESC']],
    };
    if (arg?.where) options.where = arg.where;
    if (arg?.offset) {
      options.offset = arg.offset;
      options.limit = 15;
    }
    options.include = [items, supplier];
    options.raw = true;
    options.nest = true;
    const item = await inventoryIn.findAll(options);
    if (item.length > 0) {
      event.reply(
        'inventoryIn-fetch-reply',
        response.success('Inventory In Found successfully', {
          inventoryIn: item,
        }),
      );
    } else {
      const err = new Error('No Inventory In Found');
      throw err;
    }
  } catch (error) {
    console.log({ error });
    event.reply('inventoryIn-fetch-reply', response.error(error.message));
  }
});

ipcMain.on('inventoryIn-update-message', async (event, arg) => {
  try {
    const options = {};
    if (arg.where) options.where = arg.where;

    const item = await inventoryIn.update(arg.values, options);
    if (item.length > 0) {
      event.reply(
        'inventoryIn-update-reply',
        response.success('Inventory In Updated successfully', item),
      );
    } else {
      const err = new Error('No inventoryIn Updated');
      throw err;
    }
  } catch (error) {
    event.reply('inventoryIn-update-reply', response.error(error.message));
  }
});
